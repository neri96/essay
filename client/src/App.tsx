import { useEffect, useState, useCallback } from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import GlobalStyle from "./style";

import Auth from './components/Auth';
import Header from './components/Header';
import Home from './components/Home';
import NoteModify from './components/NoteModify';
import NoteDetails from './components/NoteDetails';

import ProtectedRoute from './components/hoc/ProtectedRoute';

import useFetch from './hooks/useFetch';
import useFetchCtgs from './hooks/useFetchCtgs';

import { getUserData } from './localStorage/userData';

import { GlobalDataCtx } from './context';

import { CategoryType, MethodType, Mode, NoteArticleType, Roles } from './ts/types';

const App = () => {
  const { response: globalResponse, clearValue: clearGlobalRes, fetchData: fetchDataNotes } = useFetch();
  const { response: categoriesResponse, fetchCtgs: fetchDataCtgs } = useFetchCtgs();
  console.log(globalResponse,'globalResponse');
  
  const [mode, setMode] = useState(Mode.PRIVATE);
  const [noteType, setNoteType] = useState(NoteArticleType.ARTICLE);

  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState(0);

  const [currentCategory, setCurrentCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState<number | 'off_limits'>(15);

  const handleIsAuth = () => {
    setIsAuth(!isAuth);
  }

  useEffect(() => {
    const userData = getUserData();

    if(isAuth) {
      setRole(userData.role);
    } else if(userData) {
      userData.accessToken && setIsAuth(true);
    }
  }, [isAuth]);
  
  useEffect(() => {
    const checkAuth = () => {
      const userData = getUserData();

      if(!userData) {
        handleIsAuth();
      }
    }

    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
    }
  })

  const handleMode = useCallback((newMode: Mode) => {
    setMode(newMode);
    setCurrentCategory('all');
  
    if(newMode === Mode.PUBLIC) {
      noteType === NoteArticleType.NOTE && setNoteType(NoteArticleType.ARTICLE);
    } 
  }, [mode])

  const handleNoteType = (newNoteType: NoteArticleType) => {
    setNoteType(newNoteType);
  }

  const handleCurrentCtg = (ctgName: string) => {
    setCurrentCategory(ctgName);
  }

  const removeLimit = () => {
      setLimit('off_limits');
  }

  const handlePage = (pageNumber: number) => {
      setCurrentPage(pageNumber);
  }

  const fetchNotes = async () => {
    console.log(noteType, 'notetype fetch');
    
    try {
      await fetchDataNotes({
        method: MethodType.GET,
        url: `/note/getall?mode=${mode}&noteType=${noteType}&category=${currentCategory}&limit=${limit}&page=${currentPage}`,
        authRequiered: true
      })
    } catch (error) {
        console.log(error);
    }
  }
  console.log(globalResponse);
  
  return (
    <Router>
      <GlobalStyle />
        <GlobalDataCtx.Provider value={{
          mode, 
          role,
          isAuth,
          noteType,
          currentCategory, 
          currentPage, 
          limit,
          globalResponse,
          clearGlobalRes,
          categoriesResponse,
          handleMode,
          handleIsAuth,
          handleNoteType,
          handleCurrentCtg,
          removeLimit,
          handlePage,
          fetchNotes,
          fetchCategories: fetchDataCtgs
        }}>
          <Header />
          <Switch>
            {!isAuth &&
              <Route path='/auth'>
                <Auth />
              </Route>
            }
            <ProtectedRoute path='/' exact component={Home} />
            <ProtectedRoute path='/note/modify/:id?' component={NoteModify} />
            <ProtectedRoute path='/note/:id' component={NoteDetails} />
            <Redirect to='/' />
          </Switch>
        </GlobalDataCtx.Provider>
    </Router>
  )
}

export default App;