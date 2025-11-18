package br.com.avalia.Repository;

import br.com.avalia.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // O Spring já cria automaticamente: save(), findAll(), delete(), findById()...
    
    // Podemos criar métodos personalizados apenas declarando o nome:
    // Ex: Buscar usuário pelo email para o login
    Usuario findByEmail(String email);
}