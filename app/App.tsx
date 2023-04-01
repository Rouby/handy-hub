import {
  AppShell,
  Container,
  Divider,
  MantineProvider,
  Paper,
  Text,
} from "@mantine/core";
import { Icon123, Icon24Hours } from "@tabler/icons";
import {
  DefaultGenerics,
  Link,
  Outlet,
  parseSearchWith,
  ReactLocation,
  Route,
  Router,
  stringifySearchWith,
  useMatchRoute,
} from "@tanstack/react-location";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useMemo, useState } from "react";
import { parse, stringify } from "zipson";
import { LoginForm, Navigation } from "./components";
import { LinksGroup } from "./components/LinksGroup";
import { NavButton } from "./components/NavButton";
import { useAuth, useIsAuthenticated } from "./state";
import { trpc } from "./trpc.client";

export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [auth] = useAuth();
  const trpcClient = useMemo(
    () =>
      trpc.createClient({
        links: [
          httpBatchLink({
            url: "/trpc",
            headers() {
              return {
                Authorization: auth ? `Bearer ${auth}` : undefined,
              };
            },
          }),
        ],
      }),
    [auth]
  );
  const [reactLocation] = useState(
    () =>
      new ReactLocation({
        parseSearch: parseSearchWith((value) =>
          parse(decodeURIComponent(atob(value)))
        ),
        stringifySearch: stringifySearchWith((value) =>
          btoa(encodeURIComponent(stringify(value)))
        ),
      })
  );

  const [routes] = useState<Route<DefaultGenerics>[]>(() => [
    {
      element: <Auth />,
      children: [
        {
          path: "projects",
          meta: {
            backToId: "*",
            linkGroups: () => {
              return (
                <LinksGroup
                  icon={Icon123}
                  label="Projects"
                  links={[
                    {
                      label: "Overview",
                      to: `/projects`,
                    },
                  ]}
                />
              );
            },
          },
          children: [
            {
              path: ":id",
              meta: {
                backToId: "*/projects",
                linkGroups: () => {
                  const matchRoute = useMatchRoute();
                  const currentProjectId = matchRoute({
                    to: "/projects/:id",
                    fuzzy: true,
                  })?.id;

                  return (
                    <>
                      <NavButton
                        icon={Icon24Hours}
                        component={Link}
                        to={`/projects/${currentProjectId}`}
                      >
                        Overview
                      </NavButton>
                      <LinksGroup
                        icon={Icon123}
                        label="Blueprints"
                        links={[
                          {
                            label: "Blueprints",
                            to: `/projects/${currentProjectId}/blueprints`,
                          },
                        ]}
                      />
                    </>
                  );
                },
              },
              children: [
                {
                  path: "blueprints",
                  children: [
                    {
                      path: ":id",
                      meta: {
                        backToId: "*/projects/:id/blueprints",
                        linkGroups: () => {
                          const matchRoute = useMatchRoute();
                          const currentProjectId = matchRoute({
                            to: "/projects/:id",
                            fuzzy: true,
                          })?.id;

                          return <></>;
                        },
                      },
                      element: () =>
                        import("./pages/Blueprint").then(
                          ({ BlueprintPage }) => <BlueprintPage />
                        ),
                    },
                    {
                      element: () =>
                        import("./pages/Blueprints").then(
                          ({ BlueprintsPage }) => <BlueprintsPage />
                        ),
                    },
                  ],
                },
                {
                  element: () =>
                    import("./pages/ProjectOverview").then(
                      ({ ProjectOverviewPage }) => <ProjectOverviewPage />
                    ),
                },
              ],
            },
            {
              element: () =>
                import("./pages/Projects").then(({ ProjectsPage }) => (
                  <ProjectsPage />
                )),
            },
          ],
        },
        {
          element: <>Hello</>,
          meta: {
            linkGroups: () => {
              return (
                <NavButton icon={Icon24Hours} component={Link} to="/projects">
                  Projects
                </NavButton>
              );
            },
          },
        },
      ],
    },
  ]);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark" }}
    >
      <QueryClientProvider client={queryClient}>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <Router location={reactLocation} routes={routes}>
            <AppShell navbar={<Navigation />}>
              <Outlet />
            </AppShell>
          </Router>
        </trpc.Provider>
      </QueryClientProvider>
    </MantineProvider>
  );
}

function Auth() {
  const {
    mutateAsync: login,
    isLoading: isLoggingIn,
    error: loginError,
  } = trpc.auth.login.useMutation();

  const {
    mutateAsync: register,
    isLoading: isRegistering,
    error: registerError,
  } = trpc.auth.register.useMutation();

  const [, setAuth] = useAuth();
  const isAuthed = useIsAuthenticated();

  if (isAuthed) {
    return <Outlet />;
  }

  return (
    <>
      <Container size="xs" px="xs">
        <Paper radius="md" p="xl" withBorder>
          <Text size="lg" weight={500}>
            Welcome to Sex App
          </Text>

          <Divider my="lg" />

          <LoginForm
            onSubmit={(values) =>
              (values.mode === "login"
                ? login({
                    email: values.email,
                    password: values.password,
                  })
                : register({
                    email: values.email,
                    password: values.password,
                    name: values.name,
                  })
              ).then((token) => {
                setAuth({ token, persist: values.rememberMe });
              })
            }
            loading={isLoggingIn || isRegistering}
            error={loginError?.message ?? registerError?.message}
          />
        </Paper>
      </Container>
    </>
  );
}
