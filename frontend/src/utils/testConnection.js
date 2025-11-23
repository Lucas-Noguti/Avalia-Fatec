// Utility para testar conexão com o backend
export async function testBackendConnection() {
  try {
    const response = await fetch('http://localhost:8080/api/questions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      console.log('✅ Backend conectado com sucesso!');
      return true;
    } else {
      console.error('❌ Backend respondeu com erro:', response.status);
      return false;
    }
  } catch (error) {
    console.error('❌ Não foi possível conectar ao backend:', error.message);
    console.error('Verifique se o backend está rodando em http://localhost:8080');
    return false;
  }
}

// Testa a conexão quando o módulo é importado
testBackendConnection();
