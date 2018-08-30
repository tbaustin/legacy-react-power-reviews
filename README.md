## Installation

```bash
npm i -S react-power-reviews
yarn add react-power-reviews
```

## Usage

There are five different Review components: `ReviewSnippet`, `ReviewDisplay`, `ReviewSnapshot`,`ReviewList`, `WriteReview`.

```jsx
import React, { Component } from 'react'
import PowerReviews from 'react-power-reviews' // You can also destructure each component out if you would like (e.g. import { ReviewSnippet } from 'react-power-reviews')

export default class Index extends Component {
  render() {
    // all will need this same config just change the component
    return (
      <PowerReviews.ReviewDisplay
        apiKey={`Your Api Key`}
        merchantGroupId={`Your Merchant Group Id`}
        merchantId={`Your Merchant`}
        pageId={`Your Page Id (usually product sku)`}
        wrapperUrl={`Page which you write reviews on`}
        // If you want feedless add product here, if not exclude product
        product={{
          name: '<your_product_name>',
          url: '<your_page_url>',
          image_url: '<your_product_image_url>',
          description: '<your_product_description>',
          category_name: '<your_product_category_name>',
          manufacturer_id: '<your_product_manufacturer_id>',
          upc: '<your_product_upc>',
          brand_name: '<your_product_brand_name>',
          price: '<your_product_price>',
          in_stock: '<product_in_stock_status>',
          variants: [
            {
              name: '<variant_1_your_product_name>',
              description: '<variant_1_your_product_description>',
              upc: '<variant_1_product_upc>',
              page_id_variant: '1'
            },
            {
              name: '<variant_2_your_product_name>',
              description: '<variant_2_your_product_description>',
              upc: '<variant_2_product_upc>',
              page_id_variant: '2'
            },
            {
              name: '<variant_3_your_product_name>',
              description: '<variant_3_your_product_description>',
              upc: '<variant_3_product_upc>',
              page_id_variant: '3'
            }
          ]
        }}
      />
    )
  }
}
```

##Callbacks

Feel free to attach a callback function of `init` or `submitted`. `init` will be called after render and `submitted` once submission has occured. Two params will be passed through automatically to the callbacks.

```jsx
<PowerReviews.ReviewDisplay
  apiKey={`Your Api Key`}
  merchantGroupId={`Your Merchant Group Id`}
  merchantId={`Your Merchant`}
  pageId={`Your Page Id (usually product sku)`}
  wrapperUrl={`Page which you write reviews on`}
  init={(config, data) => {
    console.log(`rendered`)
  }}
  submitted={(config, data) => {
    console.log(`submitted`)
  }}
/>
```

##Manual Config

If you would like to read on what options you have to pass to the Power Reviews Object Model you can read here: [Reference](http://help.powerreviews.com/Content/Platform/JavaScript%20Reference%20Guide.htm)

You will just pass a config like so:

```jsx
const config = {
 on_back_to_top_click: function() {
  alert(`Back to top has been clicked`)
 }
}

<PowerReviews.ReviewDisplay
  apiKey={`Your Api Key`}
  merchantGroupId={`Your Merchant Group Id`}
  merchantId={`Your Merchant`}
  pageId={`Your Page Id (usually product sku)`}
  wrapperUrl={`Page which you write reviews on`}
  config={config}
/>
```
