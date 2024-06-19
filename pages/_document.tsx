import { Fragment } from 'react'
import Document, { Head, Main, NextScript, DocumentInitialProps, DocumentContext } from 'next/document'
import { GA_TRACKING_ID } from '../utils/gtag';

interface DocumentProps extends DocumentInitialProps {
  isProductionFlag: boolean
}

export default class CustomDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentProps> {
    const initialProps = await Document.getInitialProps(ctx)

    // Check if in production
    const isProductionFlag = process.env.NODE_ENV === 'production'

    return {
      ...initialProps,
      isProductionFlag,
    }
  }

  render() {
    const { isProductionFlag } = this.props

    return (
      <html lang="en">
        <Head>

          {/* We only want to add the scripts if in production */}
          {isProductionFlag && (
            <Fragment>
              {/* Global Site Tag (gtag.js) - Google Analytics */}
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_TRACKING_ID}', {
                      page_path: window.location.pathname,
                    });
                  `,
                }}
              />
            </Fragment>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}