import { AppShell, Group, Burger, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';

import logo from '@app-assets/owtvn-logo.png';

export const MainLayout = () => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: desktopOpened }
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          <Burger opened={!desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
          <Image src={logo} alt={logo} w={140} />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>Navbar</AppShell.Navbar>
      <AppShell.Main p="0" pt="70">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
