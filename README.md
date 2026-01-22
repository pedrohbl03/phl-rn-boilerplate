# PHL RN Boilerplate

Um boilerplate React Native moderno e pronto para produção, construído com Expo SDK 54, arquitetura MVVM e as melhores práticas de desenvolvimento mobile.

## Sobre

Este template foi criado para acelerar o desenvolvimento de aplicativos React Native, fornecendo uma base sólida com arquitetura bem definida, gerenciamento de estado, internacionalização e estilização moderna.

**Package ID:** `com.phlstart.app`

## Tecnologias

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Expo** | SDK 54 | Framework para desenvolvimento React Native |
| **React Native** | 0.81.5 | Framework mobile multiplataforma |
| **TypeScript** | 5.9 | Superset JavaScript com tipagem estática |
| **Expo Router** | 6.x | Navegação baseada em arquivos |
| **NativeWind** | 4.x | Tailwind CSS para React Native |
| **Zustand** | 5.x | Gerenciamento de estado global |
| **React Query** | 5.x | Gerenciamento de estado do servidor |
| **i18next** | 25.x | Internacionalização |
| **MMKV** | 4.x | Storage de alta performance |
| **Zod** | 3.x | Validação de schemas |
| **React Hook Form** | 7.x | Gerenciamento de formulários |

## Arquitetura MVVM

O boilerplate implementa o padrão **Model-View-ViewModel (MVVM)**, que separa claramente as responsabilidades da aplicação em três camadas:

### Model

Representa os dados e a lógica de negócio da aplicação.

```
src/
├── domain/          # Entidades e regras de negócio
│   ├── entities/    # Tipos e interfaces de domínio
│   └── schemas/     # Schemas de validação (Zod)
└── data/            # Camada de dados
    ├── api/         # Cliente HTTP e interfaces
    └── storage/     # Persistência local (MMKV)
```

### View

A interface do usuário. São componentes React puros que apenas renderizam a UI e delegam ações para o ViewModel.

```
src/
├── app/                    # Rotas (Expo Router)
│   └── (tabs)/             # Tab Navigator
└── presentation/
    └── screens/            # Telas da aplicação
        ├── HomeScreen.tsx
        ├── ArchScreen.tsx
        └── SettingsScreen.tsx
```

**Características da View:**
- Não contém lógica de negócio
- Recebe dados formatados do ViewModel
- Chama ações expostas pelo ViewModel
- Responsável apenas pela renderização

### ViewModel

A ponte entre Model e View. Contém a lógica de apresentação, gerencia o estado da tela e expõe dados e ações para a View.

```
src/
└── presentation/
    └── viewmodels/
        ├── useHomeViewModel.ts
        ├── useArchViewModel.ts
        └── useSettingsViewModel.ts
```

**Responsabilidades do ViewModel:**
- Gerenciar estado da tela
- Formatar dados para exibição
- Expor ações que a View pode executar
- Abstrair a lógica de negócio da View

### Exemplo de Implementação

**ViewModel (`useSettingsViewModel.ts`):**
```typescript
export function useSettingsViewModel() {
  const { t, i18n } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const { language, setLanguage } = useAppStore();

  // Dados formatados para a View
  const title = t('settings.title');
  const themeValue = isDark ? t('settings.dark') : t('settings.light');

  // Ações disponíveis
  const handleToggleTheme = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  return {
    isDark,
    title,
    themeValue,
    handleToggleTheme,
    // ...
  };
}
```

**View (`SettingsScreen.tsx`):**
```typescript
export function SettingsScreen() {
  const vm = useSettingsViewModel();

  return (
    <SafeAreaView>
      <Text>{vm.title}</Text>
      <Switch value={vm.isDark} onValueChange={vm.handleToggleTheme} />
    </SafeAreaView>
  );
}
```

### Benefícios do MVVM

- **Separação de responsabilidades**: Código mais organizado e fácil de manter
- **Testabilidade**: ViewModels podem ser testados independentemente da UI
- **Reutilização**: Lógica pode ser compartilhada entre diferentes Views
- **Trabalho em equipe**: Desenvolvedores podem trabalhar em paralelo nas camadas

## Estrutura de Pastas

```
src/
├── app/                    # Rotas (Expo Router)
│   ├── _layout.tsx         # Layout raiz
│   └── (tabs)/             # Tab Navigator
│       ├── _layout.tsx     # Layout das tabs
│       ├── index.tsx       # Home
│       ├── arch.tsx        # Arquitetura
│       └── settings.tsx    # Configurações
│
├── components/             # Componentes reutilizáveis
│   └── ui/                 # Componentes de UI base
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       └── Text.tsx
│
├── core/                   # Configurações e bootstrap
│   └── config/
│       ├── bootstrap.ts    # Inicialização da app
│       └── env.ts          # Variáveis de ambiente
│
├── data/                   # Camada de dados
│   ├── api/                # Cliente HTTP (Axios)
│   └── storage/            # Storage local (MMKV)
│
├── domain/                 # Domínio da aplicação
│   ├── entities/           # Entidades/tipos
│   └── schemas/            # Schemas Zod
│
├── hooks/                  # Hooks customizados
│   ├── useApi.ts
│   └── useForm.ts
│
├── i18n/                   # Internacionalização
│   ├── index.ts
│   └── locales/
│       ├── pt-BR.ts
│       └── en-US.ts
│
├── presentation/           # Camada de apresentação (MVVM)
│   ├── screens/            # Views
│   └── viewmodels/         # ViewModels
│
├── providers/              # Context Providers
│   ├── AppProvider.tsx
│   ├── ThemeProvider.tsx
│   └── query-client.ts
│
├── stores/                 # Estado global (Zustand)
│   └── app.store.ts
│
├── styles/                 # Estilos globais
│   └── global.css
│
└── types/                  # Tipos globais
    └── global.d.ts
```

## Setup

### Pré-requisitos

- Node.js 18+
- Yarn ou npm
- Android Studio (para Android)
- Xcode (para iOS, apenas macOS)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/phl-rn-boilerplate.git
cd phl-rn-boilerplate
```

2. Instale as dependências:
```bash
yarn install
# ou
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. **Execute o prebuild** (veja seção abaixo):
```bash
npx expo prebuild
```

5. Inicie o projeto:
```bash
# Desenvolvimento
yarn start

# Android
yarn android

# iOS
yarn ios
```

## Prebuild: Por que é necessário?

### O que é o Prebuild?

O comando `npx expo prebuild` (ou `expo prebuild`) gera as pastas nativas `android/` e `ios/` do projeto. Este processo é essencial quando você utiliza o **Expo com módulos nativos**.

### Por que precisamos do Prebuild?

Este boilerplate utiliza bibliotecas que requerem código nativo:

| Biblioteca | Motivo |
|------------|--------|
| **react-native-mmkv** | Storage nativo de alta performance |
| **react-native-reanimated** | Animações nativas |
| **react-native-gesture-handler** | Gestos nativos |
| **react-native-screens** | Navegação nativa otimizada |

Essas bibliotecas não funcionam com o **Expo Go** (o app de desenvolvimento padrão do Expo), pois contêm código nativo customizado que precisa ser compilado.

### Fluxo de Desenvolvimento

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  expo prebuild  │ ──▶ │  Gera android/  │ ──▶ │  expo run:*     │
│                 │     │  e ios/         │     │  ou yarn *      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Quando executar o Prebuild?

- **Primeira vez** clonando o projeto
- Após adicionar uma **nova biblioteca nativa**
- Após modificar o `app.json` (nome, ícone, splash, etc.)
- Após atualizar o **Expo SDK**

### Comandos Úteis

```bash
# Gerar pastas nativas
npx expo prebuild

# Limpar e regenerar (útil após problemas)
npx expo prebuild --clean

# Gerar apenas Android
npx expo prebuild --platform android

# Gerar apenas iOS
npx expo prebuild --platform ios
```

### Expo Go vs Development Build

| Expo Go | Development Build |
|---------|-------------------|
| App pronto para download | Build customizado |
| Limitado a APIs do Expo | Suporta qualquer biblioteca nativa |
| Não precisa de prebuild | Requer prebuild |
| Ótimo para prototipagem | Necessário para produção |

Este boilerplate usa **Development Build**, que oferece total flexibilidade para usar qualquer biblioteca nativa.

## Funcionalidades Incluídas

- **Tab Navigator** com 3 telas (Home, Arquitetura, Configurações)
- **Dark/Light Mode** com persistência
- **Internacionalização** (Português e Inglês)
- **Persistência** de preferências no MMKV
- **Componentes UI** reutilizáveis (Button, Card, Input, Text)
- **Cliente HTTP** configurado (Axios)
- **Validação** de formulários (Zod + React Hook Form)
- **Estado global** (Zustand com persistência)
- **Estado do servidor** (React Query)

## Scripts Disponíveis

```bash
yarn start       # Inicia o Metro Bundler
yarn android     # Roda no Android
yarn ios         # Roda no iOS
yarn web         # Roda no navegador
```

## Personalização

### Alterar Package ID

1. Atualize `app.json`:
```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.seudominio.app"
    },
    "android": {
      "package": "com.seudominio.app"
    }
  }
}
```

2. Execute o prebuild:
```bash
npx expo prebuild --clean
```

### Adicionar Novo Idioma

1. Crie o arquivo de tradução em `src/i18n/locales/`
2. Importe e registre em `src/i18n/index.ts`
3. Adicione a opção em `useSettingsViewModel.ts`

### Criar Nova Tela (MVVM)

1. Crie o ViewModel em `src/presentation/viewmodels/`
2. Crie a Screen em `src/presentation/screens/`
3. Crie a rota em `src/app/`
4. Exporte nos arquivos `index.ts`

## Licença

MIT

---

Desenvolvido com ❤️ por PhL
