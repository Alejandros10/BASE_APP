import React from 'react'

export const AppFooter = () => (
  <div className="layout-footer">
    <span className="footer-text" style={{ marginRight: '5px' }}>
      {process.env.REACT_APP_NAME}
    </span>
    <img src="/assets/layout/images/logo-whitse.png" alt="" width="28" />
  </div>
)
