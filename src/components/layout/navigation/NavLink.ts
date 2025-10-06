export interface NavLink {
  id: string;
  label: string;
  href: string;
  external?: boolean;
}

export const navLinks: NavLink[] = [


  {
    id: 'home',
    label: 'Accueil',
    href: '#home'
  },
  {
    id: 'find-doctor',
    label: 'acceder a son pannel',
    href: '/patient'
  },
  {
    id: 'services',
    label: 'se connecter',
    href: '/login'
  },
  {
    id: 'about',
    label: 'À propos',
    href: '/medecin'
  },
  {
    id: 'contact',
    label: 'Contactez-nous',
    href: '#contact'
  }
];