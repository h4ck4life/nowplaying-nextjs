import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Work+Sans&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="antialiased bg-black text-gray-200 font-sans p-6">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }

  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return initialProps;
  }
}

export default MyDocument;
