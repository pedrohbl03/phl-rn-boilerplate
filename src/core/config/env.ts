/**
 * Configuração de variáveis de ambiente
 * Em produção, use expo-constants ou react-native-dotenv
 */

interface Environment {
  API_URL: string;
  ENV: 'development' | 'staging' | 'production';
  DEBUG: boolean;
}

const development: Environment = {
  API_URL: 'http://localhost:3000/api',
  ENV: 'development',
  DEBUG: true,
};

const staging: Environment = {
  API_URL: 'https://staging-api.yourapp.com/api',
  ENV: 'staging',
  DEBUG: true,
};

const production: Environment = {
  API_URL: 'https://api.yourapp.com/api',
  ENV: 'production',
  DEBUG: false,
};

// Seleciona ambiente baseado em variável ou padrão
const getEnvironment = (): Environment => {
  // Você pode usar process.env.__DEV__ ou Constants.expoConfig
  if (__DEV__) {
    return development;
  }
  
  // Para staging/production, configure conforme necessário
  return production;
};

export const env = getEnvironment();
