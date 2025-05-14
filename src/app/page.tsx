import { Suspense } from 'react'
import PortalClient from '@/app/modules/portal/components/portal-client'

export default function PortalPage() {
  return (
    <Suspense fallback={null}>
      <PortalClient />
    </Suspense>
  )
}
