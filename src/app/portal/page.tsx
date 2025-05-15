import { Suspense } from 'react'
import { PortalPage } from '../modules/portal/components/portal-page'

export default function Portal() {
  return (
    <Suspense fallback={null}>
      <PortalPage />
    </Suspense>
  )
}
