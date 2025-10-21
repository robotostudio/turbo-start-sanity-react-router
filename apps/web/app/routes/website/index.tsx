import {useQuery} from '@sanity/react-loader'

import {Records} from '~/components/Records'
import {loadQuery} from '~/sanity/loader.server'
import {loadQueryOptions} from '~/sanity/loadQueryOptions.server'
import {RECORDS_QUERY} from '~/sanity/queries'
import type {RecordStub} from '~/types/record'
import {recordStubsZ} from '~/types/record'

import type {Route} from './+types'

export const meta = ({matches}: Route.MetaArgs) => {
  const layoutData = matches.find(
    (match) => match.id === `routes/website/layout`,
  )?.data
  const home = layoutData ? layoutData.initial.data : null
  const title = [home?.title, home?.siteTitle].filter(Boolean).join(' | ')

  return [{title}]
}

export const loader = async ({request}: Route.LoaderArgs) => {
  const {options} = await loadQueryOptions(request.headers)
  const query = RECORDS_QUERY
  const params = {}
  const initial = await loadQuery<RecordStub[]>(query, params, options).then(
    (res) => ({
      ...res,
      data: res.data ? recordStubsZ.parse(res.data) : null,
    }),
  )

  if (!initial.data) {
    throw new Response('Not found', {status: 404})
  }

  return {initial, query, params}
}

export default function Index({loaderData}: Route.ComponentProps) {
  const {initial, query, params} = loaderData
  const {data} = useQuery(query, params, {initial})

  return data ? <Records records={data} /> : null
}
