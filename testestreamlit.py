import streamlit as st
import google.generativeai as genai

st.set_page_config(
    page_title="Gerador de Conteúdo com Gemini Pro",
    page_icon=":robot:",
    layout="wide"
)

st.title("Gerador de Conteúdo com Gemini Pro")
st.markdown("---")

# Entrada da API Key
api_key = st.text_input("Insira sua API Key:", type="password")

# Configurações do modelo
configurações = {
    "candidate_count": 1,
    "temperature": 0.75,
    "top_k": 40,
    "top_p": 0.95
}

# Filtros de segurança (desabilitados por padrão)
filtros = {
    'HATE': 'BLOCK_NONE',
    'HARASSMENT': 'BLOCK_NONE',
    'SEXUAL': 'BLOCK_NONE',
    'DANGEROUS': 'BLOCK_NONE'
}

# Área de entrada do tema
tema = st.text_input("Digite o tema:")

# Botão de gerar conteúdo
if st.button("Gerar Conteúdo"):
    if api_key:
        try:
            genai.configure(api_key=api_key)
            model = genai.GenerativeModel(model_name='gemini-1.0-pro',
                                          generation_config=configurações,
                                          safety_settings=filtros)
            response = model.generate_content(f"Faça uma lista de 10 itens sobre o tema {tema}")
            st.success(response.text)
        except Exception as e:
            st.error(f"Erro ao gerar conteúdo: {e}")
    else:
        st.error("Por favor, insira sua API Key.")

# Botão de retornar
if st.button("Retornar"):
    st.experimental_rerun()
