import NextHead from "next/head";

export default function Head(props) {
  const { description, keywords, title } = props;
  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <meta name="description" content={description || "FateMaker"} />
      <meta name="keywords" content={keywords || ""} />
      <meta name="author" content="h4i" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans|Source+Sans+Pro&display=swap"
        rel="stylesheet"
      />
      <title>{`${title ? `${title} | ` : ""}FateMaker`}</title>
    </NextHead>
  );
}
