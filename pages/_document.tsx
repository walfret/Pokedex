import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

class MainDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head />
                <body>
                    <Main />
                    <div id="modal" />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MainDocument;