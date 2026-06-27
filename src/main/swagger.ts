export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Trabalho III API",
    version: "1.0.0",
    description: "API de controle financeiro pessoal"
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    },
    schemas: {
      UserResponse: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          email: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          token: { type: "string" }
        }
      },
      Error: {
        type: "object",
        properties: {
          message: { type: "string" }
        }
      }
    }
  },
  security: [{ bearerAuth: [] }],
  paths: {
    "/health": {
      get: {
        tags: ["Health"],
        summary: "Verifica se a API está no ar",
        security: [],
        responses: {
          "200": {
            description: "API funcionando",
            content: {
              "application/json": {
                schema: { type: "object", properties: { status: { type: "string" } } }
              }
            }
          }
        }
      }
    },
    "/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Cadastrar novo usuário",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                  name: { type: "string", example: "João Silva" },
                  email: { type: "string", format: "email", example: "joao@email.com" },
                  password: { type: "string", minLength: 6, example: "senha123" }
                }
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Usuário criado com sucesso",
            content: { "application/json": { schema: { $ref: "#/components/schemas/UserResponse" } } }
          },
          "409": {
            description: "E-mail já está em uso",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } }
          }
        }
      }
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Fazer login",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", format: "email", example: "joao@email.com" },
                  password: { type: "string", example: "senha123" }
                }
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Login realizado com sucesso",
            content: { "application/json": { schema: { $ref: "#/components/schemas/UserResponse" } } }
          },
          "401": {
            description: "Credenciais inválidas",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } }
          }
        }
      }
    },
  }
};
