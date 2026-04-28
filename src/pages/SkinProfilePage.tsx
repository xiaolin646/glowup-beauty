/**
 * 肤质档案页面 - Phase 2 核心功能
 */

import React from 'react'
import { 
  SkinProfilePage,
  SkinProfileProvider 
} from '../components/skin/SkinProfile'

export default function SkinProfilePageWrapper() {
  return (
    <SkinProfileProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            我的肤质档案
          </h1>
          <SkinProfilePage />
        </div>
      </div>
    </SkinProfileProvider>
  )
}
