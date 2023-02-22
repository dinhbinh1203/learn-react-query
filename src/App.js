import "./App.css";
import { PaginatedQueriesPage } from "./pages/PaginatedQueriesPage";
import { Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { InfiniteQueriesPage } from "./pages/InfiniteQueriesPage";
import DefaultLayout from "./layouts/DefaultLayout";
import { PostCommentsPage } from "./pages/PostCommentsPage";
import { DynamicParallelPage } from "./pages/DynamicParallelPage";
import { DependentQueriesPage } from "./pages/DependentQueriesPage";
import { Products } from "./components/Products";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<InfiniteQueriesPage />}></Route>
          <Route
            path="/post/comments/:postId"
            element={<PostCommentsPage />}
          ></Route>
          <Route
            path="/paginated-queries"
            element={<PaginatedQueriesPage />}
          ></Route>
          <Route
            path="/dynamic-parallel"
            element={<DynamicParallelPage productIds={[1, 2, 3]} />}
          ></Route>
          <Route
            path="/dependent-queries"
            element={<DependentQueriesPage postId={1} />}
          ></Route>
          <Route path="/crud-products" element={<Products />}></Route>
        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
