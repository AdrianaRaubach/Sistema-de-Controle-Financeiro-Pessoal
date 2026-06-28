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
      CategoryResponse: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          kind: { type: "string" },
          userId: { type: "string" },
          user: { type: "object"}
        }
      },
      TransactionResponse: {
        type: "object",
        properties: {
          id: { type: "string" },
          description: { type: "string" },
          type: { type: "string" },
          amount: { type: "number" },
          status: { type: "string" },
          occurredAt: { type: "string", format: "date-time" },
          paidAt: { type: "string", format: "date-time" },
          userId: { type: "string" },
          user: { type: "object" },
          categoryId: { type: "string"},
          category: { type: "object" },
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
    "/categories": {
      post: {
        tags: ["Categories"],
        summary: "Criar categoria",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "kind"],
                properties: {
                  name: { type: "string", example: "Moradia" },
                  kind: { type: "string", example: "expense" }
                }
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Categoria criada com sucesso",
            content: { "application/json": { schema: { $ref: "#/components/schemas/CategoryResponse" } } }
          },
          "401": {
            description: "Não autenticado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } }
          },
          "409": {
            description: "Categoria já existe",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } }
          }
        }
      },
      get: {
        tags: ["Categories"],
        summary: "Listar categorias",
        responses: {
          "200": {
            description: "Lista de categorias",
            content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/CategoryResponse" } } } }
          },
          "401": {
            description: "Não autenticado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } }
          }
        }
      }
    },
    "/transactions": {
      post: {
        tags: ["Transaction"],
        summary: "Criar Transação",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["description", "type", "amount", "occurredAt", "categoryId"],
                properties: {
                  description: { type: "string", example: "Aluguel" },
                  type: { type: "string", example: "expense" },
                  amount: { type: "number", example: 1500 },
                  categoryId: { type: "string", example: "123e4567-e89b-12d3-a456-426614174000" },
                  occurredAt: { type: "string", format: "date-time", example: "2026-06-21T19:45:00.000Z" }
                }
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Transação criada com sucesso",
            content: { "application/json": { schema: { $ref: "#/components/schemas/TransactionResponse" } } }
          },
          "401": {
            description: "Não autenticado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } }
          },
          "409": {
            description: "Transação já existe",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } }
          }
        }
      },
      get: {
        tags: ["Transaction"],
        summary: "Listar transações",
        responses: {
          "200": {
            description: "Lista de transações",
            content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/TransactionResponse" } } } }
          },
          "401": {
            description: "Não autenticado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } }
          }
        }
      }
    },
    "/transactions/{id}/pay": {
      patch: {
        tags: ["Transaction"],
        summary: "Marcar despesa como paga",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } }
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  paidAt: { type: "string", format: "date-time", example: "2026-06-21T19:45:00.000Z" }
                }
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Despesa marcada como paga",
            content: { "application/json": { schema: { $ref: "#/components/schemas/TransactionResponse" } } }
          },
          "401": {
            description: "Não autenticado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } }
          },
          "404": {
            description: "Transação não encontrada",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } }
          },
          "409": {
            description: "Despesa já foi paga",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } }
          }
        }
      }
    },
  }
};
