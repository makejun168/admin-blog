const menuList = [
  {
    title: 'Home',
    key: '/admin/home'
  },
  {
    title: 'UI',
    key: '/admin/ui',
    children: [
      {
        title: 'Button',
        key: '/admin/ui/buttons',
      },
      {
        title: 'Modal',
        key: '/admin/ui/modal',
      },
      {
        title: 'Loading',
        key: '/admin/ui/loading',
      },
    ]
  }
];

export default menuList;