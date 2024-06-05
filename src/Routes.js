import { BrowserRouter as Router,Switch,Route } from "react-router-dom";
import { Home } from './Page 1/Home'

export const Routes = () => { 
    return(
        <Router>
            <Switch>
                <Route path="/"><Home></Home></Route>
            </Switch>
        </Router>
    )
}