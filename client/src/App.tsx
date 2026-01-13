import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Takeaways from "./pages/Takeaways";
import Summaries from "./pages/Summaries";
import Resources from "./pages/Resources";
import Tools from "./pages/Tools";

/* 
 * Tulum Sanctuary Design System
 * - Organic Minimalism with Japandi influences
 * - Color palette: Terracotta, Sage, Sand, Cream
 * - Typography: Playfair Display (headings) + Lato (body)
 * - Signature: Organic shapes, botanical accents, meditative transitions
 */

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/quiz" component={Quiz} />
      <Route path="/takeaways" component={Takeaways} />
      <Route path="/summaries" component={Summaries} />
      <Route path="/resources" component={Resources} />
      <Route path="/tools" component={Tools} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster 
            position="bottom-center"
            toastOptions={{
              style: {
                background: 'oklch(0.99 0.005 90)',
                border: '1px solid oklch(0.88 0.02 80)',
                color: 'oklch(0.30 0.01 60)',
                fontFamily: 'Lato, sans-serif',
              },
            }}
          />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
