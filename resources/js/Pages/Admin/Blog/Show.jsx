import React from 'react'
import AdminLayout from '../../../Layouts/Admin/AdminLayout'

const Show = ({ navActive, post }) => {
  return (
    <div>
        {post.id}
    </div>
  )
}

Show.layout = page => <AdminLayout children={page} navActive={page.props.navActive} />

export default Show
