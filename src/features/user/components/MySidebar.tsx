import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { menus } from '../constants/sidebar';

export type MenuType = 'orders' | 'coupons' | 'profile' | 'wishlist' | 'points';

interface MySidebarProps {
  activeMenu: MenuType;
  onMenuChange: (menu: MenuType) => void;
}

export default function MySidebar({ activeMenu, onMenuChange }: MySidebarProps) {
  const { userInfo } = useAuthStore();

  return (
    <aside className="w-full flex-shrink-0 md:w-[250px]">
      <div className="h-fit rounded-xl border border-gray-200 bg-white p-6">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-800 text-t5 font-medium text-white">
            {userInfo?.name.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <div className="truncate font-bold text-gray-900">{userInfo?.name}</div>
            <div className="truncate text-t3 text-gray-500">{userInfo?.email}</div>
          </div>
        </div>
        <div className="my-4 h-px bg-gray-100"></div>
        <nav className="flex flex-col gap-1">
          {menus.map((menu) => {
            const Icon = menu.icon;
            const isActive = activeMenu === menu.id;
            return (
              <button
                key={menu.id}
                onClick={() => onMenuChange(menu.id as MenuType)}
                className={`
                      flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-t3 transition-colors
                      ${
                        isActive
                          ? 'bg-primary-50 font-medium text-primary-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
              >
                <Icon size={18} />
                {menu.label}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
