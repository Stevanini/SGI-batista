import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  Image,
  Settings,
  Home,
  FileText,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  X,
  Users,
} from "lucide-react";
import UserApprovalManager from '@/pages/dashboard/UserApprovalManager';
import { supabase } from '@/integrations/supabase/client';

// Componente para o botão de toggle da sidebar
const SidebarToggleButton = () => {
  const { toggleSidebar, state, isMobile, openMobile } = useSidebar();
  const isCollapsed = state === "collapsed";

  // No mobile, mostrar X quando aberto
  if (isMobile && openMobile) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 absolute right-2 top-2 z-20"
        onClick={toggleSidebar}
      >
        <X className="h-5 w-5" />
      </Button>
    );
  }

  // Desktop ou mobile fechado: manter padrão
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 absolute right-2 top-2 z-20"
      onClick={toggleSidebar}
    >
      {isCollapsed ? (
        <PanelLeftOpen className="h-4 w-4" />
      ) : (
        <PanelLeftClose className="h-4 w-4" />
      )}
    </Button>
  );
};

const SidebarHeaderContent = () => {
  const { state } = useSidebar();
  return (
    <div
      className={`h-12 flex items-center transition-opacity duration-300 whitespace-nowrap ${
        state === "expanded" ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <h2 className="text-xl font-bold">Dashboard Batista</h2>
    </div>
  );
};

const SidebarContent = ({ children }: { children: React.ReactNode }) => {
  const { state } = useSidebar();
  return (
    <div
      className={`flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden pl-1.5`}
      data-sidebar="content"
    >
      {children}
    </div>
  );
};

const SidebarFooterContent = () => {
  const { state } = useSidebar();
  const { signOut } = useAuth();
  return (
    <Button
      variant="ghost"
      className={`w-full flex items-center px-4 ${
        state === "collapsed" ? "justify-center" : "justify-start"
      }`}
      onClick={() => signOut()}
    >
      <LogOut className="h-4 w-4" />
      {state !== "collapsed" && <span className="ml-2">Sair</span>}
    </Button>
  );
};

const MobileSidebarButton = () => {
  const { isMobile, toggleSidebar, openMobile } = useSidebar();
  if (!isMobile) return null;
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-10 w-10 fixed top-4 right-4 z-30 md:hidden bg-primary text-primary-foreground shadow rounded-xl"
      onClick={toggleSidebar}
    >
      <Menu className="h-6 w-6" />
    </Button>
  );
};

const DashboardLayout = () => {
  const { signOut, user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data } = await supabase
          .from('user_profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();
        setIsAdmin(!!data?.is_admin);
      }
    };
    fetchProfile();
  }, [user]);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full pt-16 md:pt-0">
        <MobileSidebarButton />
        <Sidebar collapsible="icon">
          <SidebarHeader className="flex flex-col items-center px-4 py-2 relative h-24">
            <div className="w-full flex justify-end" style={{ height: 40 }}>
              <SidebarToggleButton />
            </div>
            <SidebarHeaderContent />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard">
                  <a href="/dashboard">
                    <Home />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Banner">
                  <a href="/dashboard/banner">
                    <Image />
                    <span>Banner Principal</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Bazar">
                  <a href="/dashboard/bazar">
                    <FileText />
                    <span>Bazar Missionário</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Reflexões">
                  <a href="/dashboard/reflexoes">
                    <FileText />
                    <span>Reflexões</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Galeria">
                  <a href="/dashboard/galeria">
                    <Image />
                    <span>Galeria</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Contato">
                  <a href="/dashboard/contato">
                    <Settings />
                    <span>Contato</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {isAdmin && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Usuários">
                      <a href="/dashboard/usuarios">
                        <Users />
                        <span>Usuários</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Controle de Caixa">
                      <a href="/dashboard/caixa">
                        <FileText />
                        <span>Controle de Caixa</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarFooterContent />
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <div className="p-6">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
