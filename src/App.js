import Home from "./pages/home";
import TableContextProvider from "./dataTableContext/Tablecontext";

function App() {
  return (
    <div className="App">
      <TableContextProvider>
        <Home />
      </TableContextProvider>
    </div>
  );
}

export default App;
