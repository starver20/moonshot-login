"use client";
import React, { createContext } from "react";



type User = {name: string, email: string, id: number}
type Action = {type: 'setUser', paylod: User} | {type: 'removeUser'}
type Dispatch = (action: Action) => void
type State = {user:User, isLoggedIn: boolean}
type UserProviderProps = {children: React.ReactNode}

const UserContext = createContext<{state: State; dispatch: Dispatch} | undefined
>(undefined);

function userReducer(state: State, action: Action) {
    switch (action.type) {
      case 'setUser': {
        return {user: action.paylod, isLoggedIn: true}
      }
      case 'removeUser': {
        return {
         user:{
          name: '',
          email: '',
          id: 0
         },
         isLoggedIn: false
        }
      }
      default: {
        throw new Error(`Unhandled action type:`)
      }
    }
  }
function UserProvider({ children }: UserProviderProps) {
    const [state, dispatch] = React.useReducer(userReducer, {
       user : {
        name: '',
        email: '',
        id: 0
       },
        isLoggedIn: false
    })
    const value = {state, dispatch}

  return (
    <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
  );
}

function useUser() {
    const context = React.useContext(UserContext)
    if (context === undefined) {
      throw new Error('useUser must be used within a UserProvider')
    }
    return context
  }
  

export { UserProvider, useUser };