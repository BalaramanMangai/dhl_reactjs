const navigations = [
  {
    name: "Dashboard",
    path: "/dashboard/default",
    icon: "dashboard",
    roles: ["1", "2","3"],
  },
  {
    name: "Agents",
    icon: "face",
    badge: { value: "", color: "secondary" },
    roles: ["3"],
    children: [
      { name: "All Agent", path: "/agents", iconText: "A", roles: ["3"] },
      { name: "Add Agent", path: "/agents/add-agent", iconText: "A", roles: ["3"] },
    ],
  },
  {
    name: "Members",
    icon: "exposure",
    badge: { value: "", color: "secondary" },
    roles: ["2", "3"],
    children: [
      { name: "All Members", path: "/members", iconText: "A", roles: ["2", "3"] },
      { name: "Add Member", path: "/members/add-member", iconText: "A", roles: ["2", "3"] },
    ],
  },

  {
    name: "Sales",
    path: "/sales",
    icon: "exposure",
    roles: ["1", "2","3"],
  },
  {
    name: "Sales Overview",
    path: "/salesoverview",
    icon: "exposure",
    roles: ["1", "2","3"],
  },

  // {
  //   name: "Products",
  //   icon: "explore",
  //   badge: { value: "", color: "secondary" },
  //   roles: ["3"],
  //   children: [
  //     { name: "All Product", path: "/products", iconText: "A", roles: ["3"] },
  //     { name: "Add Product", path: "/products/add-product", iconText: "A", roles: ["3"] },
  //   ],
  // },
];

export default navigations;
