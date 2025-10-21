import type {LoaderFunction} from 'react-router'
import {data, redirect} from 'react-router'

import {themePreferenceCookie} from '~/cookies'

import type {Route} from './+types/toggle-theme'

export const action = async ({request}: Route.ActionArgs) => {
  const cookieHeader = request.headers.get('Cookie')
  const cookie = (await themePreferenceCookie.parse(cookieHeader)) || {}
  const themePreference = cookie.themePreference === `dark` ? `light` : `dark`

  return data(
    {themePreference},
    {
      headers: {
        'Set-Cookie': await themePreferenceCookie.serialize({
          themePreference,
        }),
      },
    },
  )
}

export const loader: LoaderFunction = () => redirect('/', {status: 404})
