import { menuData, MenuItem, SubMenuItem } from "./sidebar-manu-data";

const filterMenuItems = (items: MenuItem[], query: string): MenuItem[] => {
  if (!query.trim()) return items;
  const searchLower = query.toLowerCase();
  const filterRecursive = (
    item: MenuItem | SubMenuItem,
  ): MenuItem | SubMenuItem | null => {
    const matchesLabel = item.label.toLowerCase().includes(searchLower);

    if (item.children) {
      const filteredChildren = item.children
        .map((child) => filterRecursive(child))
        .filter(Boolean) as SubMenuItem[];

      if (matchesLabel || filteredChildren.length > 0) {
        return {
          ...item,
          children:
            filteredChildren.length > 0 ? filteredChildren : item.children,
        };
      }
    } else if (matchesLabel) {
      return item;
    }

    return null;
  };

  return items
    .map((item) => filterRecursive(item))
    .filter(Boolean) as MenuItem[];
};

export function mainMenuData({ searchQuery }: { searchQuery: string }) {
  const filteredMenuData = menuData
    .map((section) => ({
      ...section,
      items: filterMenuItems(section.items, searchQuery),
    }))
    .filter((section) => section.items.length > 0);
  return filteredMenuData;
}
