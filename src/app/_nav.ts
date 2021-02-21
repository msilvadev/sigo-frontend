import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-graph'
  },
  {
    name: 'Módulos',
    url: '/modules',
    icon: 'icon-globe',
    children: [
      {
        name: 'Gestão de Normas',
        url: '/standard',
        icon: 'icon-layers'
      },
      {
        name: 'Consultorias e Assessorias',
        url: '/gca',
        icon: 'icon-people'
      },
      {
        name: 'Processos Industriais',
        url: '/gpi',
        icon: 'icon-speedometer'
      }
    ]
  },
  {
    divider: true
  }
];
