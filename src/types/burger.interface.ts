export type IburgerInput = Omit<Iburger, 'id'>

export interface Iburger {
  id?: number
  breads: string
  burgers: string
  ingredients: string
  additionals: string
  status?: 'ACTIVATE' | 'INACTIVATE'
}

interface Icontacts {
  name: string
  email: string
}

export interface IMountburger {
  breads: string
  burgers: string
  ingredients: string
  additionals: string
  contacts: Icontacts
}
