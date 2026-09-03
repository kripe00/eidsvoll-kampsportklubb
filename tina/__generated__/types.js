export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const OmOssPartsFragmentDoc = gql`
    fragment OmOssParts on OmOss {
  __typename
  title
  description
  blocks {
    __typename
    ... on OmOssBlocksAbout {
      title
      body
      image
      video
    }
    ... on OmOssBlocksValues {
      title
      description
      variant
      image
      items {
        __typename
        title
        text
        icon
      }
    }
    ... on OmOssBlocksMembership {
      title
      description
      linkUrl
      boostLinkUrl
      boostEnabled
      extraInfo
    }
    ... on OmOssBlocksTrainers {
      title
      trainerList {
        __typename
        name
        role
        image
        bio
      }
    }
    ... on OmOssBlocksSponsors {
      title
      sponsorList {
        __typename
        name
        logo
        url
      }
    }
    ... on OmOssBlocksBenefits {
      title
      items {
        __typename
        title
        text
        icon
      }
    }
    ... on OmOssBlocksFaq {
      title
      items {
        __typename
        question
        answer
      }
    }
    ... on OmOssBlocksPackages {
      title
      description
      packagesList {
        __typename
        name
        description
        perks
        highlighted
      }
    }
    ... on OmOssBlocksTimeline {
      title
      subtitle
      events {
        __typename
        year
        title
        location
        description
        highlight
      }
    }
    ... on OmOssBlocksOrgSeparation {
      title
      subtitle
      description
    }
    ... on OmOssBlocksCheckmat {
      title
      subtitle
      description
      features {
        __typename
        title
        description
        icon
      }
    }
  }
}
    `;
export const PagePartsFragmentDoc = gql`
    fragment PageParts on Page {
  __typename
  title
  description
  blocks {
    __typename
    ... on PageBlocksAbout {
      title
      body
      image
      video
    }
    ... on PageBlocksValues {
      title
      description
      variant
      image
      items {
        __typename
        title
        text
        icon
      }
    }
    ... on PageBlocksMembership {
      title
      description
      linkUrl
      boostLinkUrl
      boostEnabled
      extraInfo
    }
    ... on PageBlocksTrainers {
      title
      trainerList {
        __typename
        name
        role
        image
        bio
      }
    }
    ... on PageBlocksSponsors {
      title
      sponsorList {
        __typename
        name
        logo
        url
      }
    }
    ... on PageBlocksBenefits {
      title
      items {
        __typename
        title
        text
        icon
      }
    }
    ... on PageBlocksFaq {
      title
      items {
        __typename
        question
        answer
      }
    }
    ... on PageBlocksPackages {
      title
      description
      packagesList {
        __typename
        name
        description
        perks
        highlighted
      }
    }
    ... on PageBlocksTimeline {
      title
      subtitle
      events {
        __typename
        year
        title
        location
        description
        highlight
      }
    }
    ... on PageBlocksOrgSeparation {
      title
      subtitle
      description
    }
    ... on PageBlocksCheckmat {
      title
      subtitle
      description
      features {
        __typename
        title
        description
        icon
      }
    }
  }
}
    `;
export const HeroPartsFragmentDoc = gql`
    fragment HeroParts on Hero {
  __typename
  welcomeText
  highlightedText
  description
  backgroundImage
  backgroundVideo
  instagramTitle
  instagramUsername
  instagramLink
  instagramImages {
    __typename
    image
    caption
    postUrl
  }
}
    `;
export const SchedulePartsFragmentDoc = gql`
    fragment ScheduleParts on Schedule {
  __typename
  days {
    __typename
    day
    slots {
      __typename
      time
      activity
      group
      room
      trainer
    }
  }
}
    `;
export const StyretPartsFragmentDoc = gql`
    fragment StyretParts on Styret {
  __typename
  title
  description
  blocks {
    __typename
    ... on StyretBlocksAbout {
      title
      body
      image
      video
    }
    ... on StyretBlocksValues {
      title
      description
      variant
      image
      items {
        __typename
        title
        text
        icon
      }
    }
    ... on StyretBlocksMembership {
      title
      description
      linkUrl
      boostLinkUrl
      boostEnabled
      extraInfo
    }
    ... on StyretBlocksTrainers {
      title
      trainerList {
        __typename
        name
        role
        image
        bio
      }
    }
    ... on StyretBlocksSponsors {
      title
      sponsorList {
        __typename
        name
        logo
        url
      }
    }
    ... on StyretBlocksBenefits {
      title
      items {
        __typename
        title
        text
        icon
      }
    }
    ... on StyretBlocksFaq {
      title
      items {
        __typename
        question
        answer
      }
    }
    ... on StyretBlocksPackages {
      title
      description
      packagesList {
        __typename
        name
        description
        perks
        highlighted
      }
    }
    ... on StyretBlocksTimeline {
      title
      subtitle
      events {
        __typename
        year
        title
        location
        description
        highlight
      }
    }
    ... on StyretBlocksOrgSeparation {
      title
      subtitle
      description
    }
    ... on StyretBlocksCheckmat {
      title
      subtitle
      description
      features {
        __typename
        title
        description
        icon
      }
    }
  }
  members {
    __typename
    role
    name
    image
  }
  committees {
    __typename
    name
    people {
      __typename
      role
      name
    }
  }
}
    `;
export const OrganisasjonsplanPartsFragmentDoc = gql`
    fragment OrganisasjonsplanParts on Organisasjonsplan {
  __typename
  title
  body
}
    `;
export const NewsPartsFragmentDoc = gql`
    fragment NewsParts on News {
  __typename
  title
  date
  category
  image
  description
  body
}
    `;
export const SponsorerPartsFragmentDoc = gql`
    fragment SponsorerParts on Sponsorer {
  __typename
  title
  blocks {
    __typename
    ... on SponsorerBlocksAbout {
      title
      body
      image
      video
    }
    ... on SponsorerBlocksValues {
      title
      description
      variant
      image
      items {
        __typename
        title
        text
        icon
      }
    }
    ... on SponsorerBlocksMembership {
      title
      description
      linkUrl
      boostLinkUrl
      boostEnabled
      extraInfo
    }
    ... on SponsorerBlocksTrainers {
      title
      trainerList {
        __typename
        name
        role
        image
        bio
      }
    }
    ... on SponsorerBlocksSponsors {
      title
      sponsorList {
        __typename
        name
        logo
        url
      }
    }
    ... on SponsorerBlocksBenefits {
      title
      items {
        __typename
        title
        text
        icon
      }
    }
    ... on SponsorerBlocksFaq {
      title
      items {
        __typename
        question
        answer
      }
    }
    ... on SponsorerBlocksPackages {
      title
      description
      packagesList {
        __typename
        name
        description
        perks
        highlighted
      }
    }
    ... on SponsorerBlocksTimeline {
      title
      subtitle
      events {
        __typename
        year
        title
        location
        description
        highlight
      }
    }
    ... on SponsorerBlocksOrgSeparation {
      title
      subtitle
      description
    }
    ... on SponsorerBlocksCheckmat {
      title
      subtitle
      description
      features {
        __typename
        title
        description
        icon
      }
    }
  }
}
    `;
export const MedlemskapPartsFragmentDoc = gql`
    fragment MedlemskapParts on Medlemskap {
  __typename
  title
  blocks {
    __typename
    ... on MedlemskapBlocksAbout {
      title
      body
      image
      video
    }
    ... on MedlemskapBlocksValues {
      title
      description
      variant
      image
      items {
        __typename
        title
        text
        icon
      }
    }
    ... on MedlemskapBlocksMembership {
      title
      description
      linkUrl
      boostLinkUrl
      boostEnabled
      extraInfo
    }
    ... on MedlemskapBlocksTrainers {
      title
      trainerList {
        __typename
        name
        role
        image
        bio
      }
    }
    ... on MedlemskapBlocksSponsors {
      title
      sponsorList {
        __typename
        name
        logo
        url
      }
    }
    ... on MedlemskapBlocksBenefits {
      title
      items {
        __typename
        title
        text
        icon
      }
    }
    ... on MedlemskapBlocksFaq {
      title
      items {
        __typename
        question
        answer
      }
    }
    ... on MedlemskapBlocksPackages {
      title
      description
      packagesList {
        __typename
        name
        description
        perks
        highlighted
      }
    }
    ... on MedlemskapBlocksTimeline {
      title
      subtitle
      events {
        __typename
        year
        title
        location
        description
        highlight
      }
    }
    ... on MedlemskapBlocksOrgSeparation {
      title
      subtitle
      description
    }
    ... on MedlemskapBlocksCheckmat {
      title
      subtitle
      description
      features {
        __typename
        title
        description
        icon
      }
    }
  }
}
    `;
export const ContactPartsFragmentDoc = gql`
    fragment ContactParts on Contact {
  __typename
  email
  phone
  address
  facebook
  instagram
  image
}
    `;
export const GlobalPartsFragmentDoc = gql`
    fragment GlobalParts on Global {
  __typename
  clubName
  logo
  facebook
  instagram
  nav {
    __typename
    label
    href
  }
  sponsors {
    __typename
    name
    logo
    url
  }
  footerDescription
  footerEmail
  footerPhone
  footerAddress
  footerOrgNumber
}
    `;
export const OmOssDocument = gql`
    query omOss($relativePath: String!) {
  omOss(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...OmOssParts
  }
}
    ${OmOssPartsFragmentDoc}`;
export const OmOssConnectionDocument = gql`
    query omOssConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: OmOssFilter) {
  omOssConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...OmOssParts
      }
    }
  }
}
    ${OmOssPartsFragmentDoc}`;
export const PageDocument = gql`
    query page($relativePath: String!) {
  page(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageParts
  }
}
    ${PagePartsFragmentDoc}`;
export const PageConnectionDocument = gql`
    query pageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageFilter) {
  pageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageParts
      }
    }
  }
}
    ${PagePartsFragmentDoc}`;
export const HeroDocument = gql`
    query hero($relativePath: String!) {
  hero(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...HeroParts
  }
}
    ${HeroPartsFragmentDoc}`;
export const HeroConnectionDocument = gql`
    query heroConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: HeroFilter) {
  heroConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...HeroParts
      }
    }
  }
}
    ${HeroPartsFragmentDoc}`;
export const ScheduleDocument = gql`
    query schedule($relativePath: String!) {
  schedule(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ScheduleParts
  }
}
    ${SchedulePartsFragmentDoc}`;
export const ScheduleConnectionDocument = gql`
    query scheduleConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ScheduleFilter) {
  scheduleConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ScheduleParts
      }
    }
  }
}
    ${SchedulePartsFragmentDoc}`;
export const StyretDocument = gql`
    query styret($relativePath: String!) {
  styret(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...StyretParts
  }
}
    ${StyretPartsFragmentDoc}`;
export const StyretConnectionDocument = gql`
    query styretConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: StyretFilter) {
  styretConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...StyretParts
      }
    }
  }
}
    ${StyretPartsFragmentDoc}`;
export const OrganisasjonsplanDocument = gql`
    query organisasjonsplan($relativePath: String!) {
  organisasjonsplan(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...OrganisasjonsplanParts
  }
}
    ${OrganisasjonsplanPartsFragmentDoc}`;
export const OrganisasjonsplanConnectionDocument = gql`
    query organisasjonsplanConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: OrganisasjonsplanFilter) {
  organisasjonsplanConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...OrganisasjonsplanParts
      }
    }
  }
}
    ${OrganisasjonsplanPartsFragmentDoc}`;
export const NewsDocument = gql`
    query news($relativePath: String!) {
  news(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...NewsParts
  }
}
    ${NewsPartsFragmentDoc}`;
export const NewsConnectionDocument = gql`
    query newsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: NewsFilter) {
  newsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...NewsParts
      }
    }
  }
}
    ${NewsPartsFragmentDoc}`;
export const SponsorerDocument = gql`
    query sponsorer($relativePath: String!) {
  sponsorer(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...SponsorerParts
  }
}
    ${SponsorerPartsFragmentDoc}`;
export const SponsorerConnectionDocument = gql`
    query sponsorerConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: SponsorerFilter) {
  sponsorerConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...SponsorerParts
      }
    }
  }
}
    ${SponsorerPartsFragmentDoc}`;
export const MedlemskapDocument = gql`
    query medlemskap($relativePath: String!) {
  medlemskap(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...MedlemskapParts
  }
}
    ${MedlemskapPartsFragmentDoc}`;
export const MedlemskapConnectionDocument = gql`
    query medlemskapConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: MedlemskapFilter) {
  medlemskapConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...MedlemskapParts
      }
    }
  }
}
    ${MedlemskapPartsFragmentDoc}`;
export const ContactDocument = gql`
    query contact($relativePath: String!) {
  contact(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ContactParts
  }
}
    ${ContactPartsFragmentDoc}`;
export const ContactConnectionDocument = gql`
    query contactConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ContactFilter) {
  contactConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ContactParts
      }
    }
  }
}
    ${ContactPartsFragmentDoc}`;
export const GlobalDocument = gql`
    query global($relativePath: String!) {
  global(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...GlobalParts
  }
}
    ${GlobalPartsFragmentDoc}`;
export const GlobalConnectionDocument = gql`
    query globalConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: GlobalFilter) {
  globalConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...GlobalParts
      }
    }
  }
}
    ${GlobalPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    omOss(variables, options) {
      return requester(OmOssDocument, variables, options);
    },
    omOssConnection(variables, options) {
      return requester(OmOssConnectionDocument, variables, options);
    },
    page(variables, options) {
      return requester(PageDocument, variables, options);
    },
    pageConnection(variables, options) {
      return requester(PageConnectionDocument, variables, options);
    },
    hero(variables, options) {
      return requester(HeroDocument, variables, options);
    },
    heroConnection(variables, options) {
      return requester(HeroConnectionDocument, variables, options);
    },
    schedule(variables, options) {
      return requester(ScheduleDocument, variables, options);
    },
    scheduleConnection(variables, options) {
      return requester(ScheduleConnectionDocument, variables, options);
    },
    styret(variables, options) {
      return requester(StyretDocument, variables, options);
    },
    styretConnection(variables, options) {
      return requester(StyretConnectionDocument, variables, options);
    },
    organisasjonsplan(variables, options) {
      return requester(OrganisasjonsplanDocument, variables, options);
    },
    organisasjonsplanConnection(variables, options) {
      return requester(OrganisasjonsplanConnectionDocument, variables, options);
    },
    news(variables, options) {
      return requester(NewsDocument, variables, options);
    },
    newsConnection(variables, options) {
      return requester(NewsConnectionDocument, variables, options);
    },
    sponsorer(variables, options) {
      return requester(SponsorerDocument, variables, options);
    },
    sponsorerConnection(variables, options) {
      return requester(SponsorerConnectionDocument, variables, options);
    },
    medlemskap(variables, options) {
      return requester(MedlemskapDocument, variables, options);
    },
    medlemskapConnection(variables, options) {
      return requester(MedlemskapConnectionDocument, variables, options);
    },
    contact(variables, options) {
      return requester(ContactDocument, variables, options);
    },
    contactConnection(variables, options) {
      return requester(ContactConnectionDocument, variables, options);
    },
    global(variables, options) {
      return requester(GlobalDocument, variables, options);
    },
    globalConnection(variables, options) {
      return requester(GlobalConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "https://content.tinajs.io/2.4/content/810c085c-dd16-47c3-8ca2-865f4019e4ca/github/main",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
