import { prState } from "../state"

function loadScript(src) {
	return new Promise((resolve, reject) => {
		let s
		s = document.createElement(`script`)
		s.src = src
		s.onload = resolve
		s.onerror = reject
		document.head.appendChild(s)
	})
}

const defaultComps = [
	`CategorySnippet`,
	`ReviewSnippet`,
	`ReviewDisplay`,
	`ReviewSnapshot`,
	`ReviewList`,
	`QuestionSnippet`,
	`QuestionDisplay`,
	`ReviewImageSnippet`,
	`ReviewImageDisplay`,
	`WhydYouBuyDisplay`,
	`Write`,
	`WhydYouBuy`,
	`AddToCart`,
]

export default props => {
	let updatedComps = {}
	const userComps = Object.keys(props.components)
	userComps.forEach(comp => {
		if (defaultComps.includes(comp)) {
			if (comp === `CategorySnippet`) {
				return
			}
			updatedComps[comp] = props.components[comp]
		} else {
			console.warn(
				`${comp} does not exist for Power-Reviews and will be removed from your list`
			)
		}
	})
	if (Object.keys(updatedComps).length === 0) {
		console.warn(
			`No components were added to the powerReviewConfig, please make sure you are spelling your component correctly or that it exists`
		)
	}
	let mainComp = {
		api_key: props.apiKey,
		locale: props.locale || `en_US`,
		merchant_group_id: props.merchantGroupId,
		merchant_id: props.merchantId,
		page_id: props.pageId,
		review_wrapper_url:
			props.wrapperUrl || `/write-review?page_id=${props.pageId}`,
		components: updatedComps,
		on_render: (config, data) => {
			if (props.init) {
				props.init(config, data)
			}
		},
		on_submit: (config, data) => {
			if (props.submitted) {
				props.submitted(config, data)
			}
		},
	}
	if (props.product) {
		mainComp.product = props.product
	}
	if (props.config) {
		Object.keys(props.config).forEach(key => {
			mainComp[key] = props.config[key]
		})
	}
	let content = [mainComp]
	if (props.categorySnippets) {
		props.categorySnippets.snippets.forEach(snippet => {
			content.push({
				locale: `en_US`,
				merchant_group_id: props.merchantGroupId,
				merchant_id: props.merchantId,
				page_id: snippet,
				api_key: props.apiKey,
				components: {
					CategorySnippet: `${props.categorySnippets.id}-${snippet}`,
				},
			})
		})
	}
	console.log(content)
	return new Promise(async (resolve, reject) => {
		if (!window.POWERREVIEWS) {
			await loadScript(`//ui.powerreviews.com/stable/4.0/ui.js`).catch(err => {
				reject(`Something went wrong while loading the script: ${err}`)
			})
			content.components = content.components || prState.state.components
			window.POWERREVIEWS.display.render(content)
			resolve()
		} else if (window.POWERREVIEWS) {
			content.components = content.components || prState.state.components
			window.POWERREVIEWS.display.render(content)
			resolve()
		}
	})
}
