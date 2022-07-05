/*
 * Copyright © 2022 ICON Clinical Research Ltd.
 * All rights reserved.
 */
import qs from 'query-string'

export default function getFilterParams(search) {
  let params = {}
  try {
    params = qs.parse(search)
  } catch (error) {
    params = {}
  }
  return params
}
