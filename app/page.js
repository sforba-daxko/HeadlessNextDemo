import Image from "next/image";
import Header from "./layout/header";
import Hero from "./components/hero";
import Feature from "./components/feature";


const getHomePageData = async () => {
  const res = await fetch(process.env.WP_GRAPHQL_ENDPOINT, {
    method: 'POST',
    next: { revalidate: 10 },
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `query HomePageQuery {
        page(id: "cG9zdDo2") {
          content
          pageFields {
            fields {
              fieldGroupName
              ... on PageFieldsFieldsHeroLayout {
                __typename
                hero {
                  copy
                  __typename
                  title
                  cta {
                    target
                    title
                    url
                  }
                }
              }
              ... on PageFieldsFieldsFeatureLayout {
                __typename
                feature {
                  copy
                  fieldGroupName
                  headline
                  featureList {
                    featureCopy
                    featureTitle
                    fieldGroupName
                  }
                }
              }
            }
          }
        }
      }`
    })
  })


  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  const responseJson = await res?.json();
  return responseJson?.data?.page?.pageFields;
}


const Home = async () => {
  const homeData = await getHomePageData();
  const {fields} = homeData || {};

  const renderComponents = () => {
    return fields && fields.map((field, index)=> {
      let component = null;
      const {__typename} = field || {};
      switch (__typename) {
        case 'PageFieldsFieldsHeroLayout':
          component = <Hero {...field?.hero} key={`${__typename}_${index}`}/>;
          break;
        case 'PageFieldsFieldsFeatureLayout':
          component = < Feature {...field?.feature} key={`${__typename}_${index}`}/>;
          break;          
        default:
          component =<div key={`null_${index}`}/>;
          break;
      }
      return component;
    });
  }
  return (
    <>
      <Header />
      <main >
        {renderComponents()}
      </main>
    </>

  );
}

export default Home;