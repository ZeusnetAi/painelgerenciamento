// Sistema de Gerenciamento de Clientes - Crédito Rural
class CreditoRuralSystem {
    constructor() {
        this.clientes = [];
        this.currentClienteId = 1;
        this.impedimentosTemp = [];
        this.fontesRendaTemp = [];
    }

    init() {
        console.log('Inicializando o sistema...');
        this.loadData();
        console.log('Dados carregados:', this.clientes);
        this.setupEventListeners();
        console.log('Event listeners configurados');
        this.updateUI();
        console.log('UI atualizada');
        this.setTodayDate();
        console.log('Data atual definida');
        
        // Garantir que os modais estejam fechados ao iniciar
        const modalNovoCliente = document.getElementById('modalNovoCliente');
        const modalRelatorios = document.getElementById('modalRelatorios');
        
        if (modalNovoCliente) {
            modalNovoCliente.classList.remove('active');
            modalNovoCliente.style.display = 'none';
        }
        
        if (modalRelatorios) {
            modalRelatorios.classList.remove('active');
            modalRelatorios.style.display = 'none';
        }
        
        console.log('Sistema inicializado com sucesso');
    }

    loadData() {
        const savedData = localStorage.getItem('creditoRuralClientes');
        if (savedData) {
            try {
                this.clientes = JSON.parse(savedData);
                this.currentClienteId = Math.max(...this.clientes.map(c => c.id), 0) + 1;
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
                this.clientes = this.getInitialData();
                this.currentClienteId = this.clientes.length + 1;
            }
        } else {
            this.clientes = this.getInitialData();
            this.currentClienteId = this.clientes.length + 1;
        }
        this.saveData();
    }

    getInitialData() {
        return [
            {
                id: 1,
                nome: "João Silva Santos",
                cpf: "123.456.789-01",
                telefone: "(91) 99999-1234",
                email: "joao.silva@email.com",
                banco: "Banco do Brasil",
                tipoEmpreendimento: "Pecuária",
                dataInicio: "2025-01-15",
                status: "Em andamento",
                planoSafra: "2025/2026",
                tipoProdutor: "Pronamp",
                sistemaProducao: "Semi-intensivo",
                rotacaoPastagem: true,
                fontesRenda: ["Pecuária", "Agricultura"],
                propriedades: [
                    {
                        nome: "Fazenda Esperança",
                        area: 150,
                        municipio: "Paragominas",
                        estado: "PA",
                        modulosFiscais: 75,
                        classificacao: "Pequena Propriedade"
                    }
                ],
                impedimentos: [
                    {
                        tipo: "CAR irregular",
                        status: "Em andamento",
                        dataResolucao: null,
                        observacoes: "Processo em análise no órgão ambiental"
                    }
                ]
            },
            {
                id: 2,
                nome: "Maria José Oliveira",
                cpf: "987.654.321-02",
                telefone: "(91) 98888-5678",
                email: "maria.oliveira@email.com",
                banco: "SICREDI",
                tipoEmpreendimento: "Agricultura",
                dataInicio: "2024-11-20",
                status: "Aprovado",
                planoSafra: "2025/2026",
                tipoProdutor: "Pronaf",
                sistemaProducao: "Intensivo",
                rotacaoPastagem: false,
                fontesRenda: ["Agricultura"],
                propriedades: [
                    {
                        nome: "Sítio Bom Jardim",
                        area: 25,
                        municipio: "Tomé-Açu",
                        estado: "PA",
                        modulosFiscais: 25,
                        classificacao: "Pequena Propriedade"
                    }
                ],
                impedimentos: []
            },
            {
                id: 3,
                nome: "Carlos Eduardo Mendes",
                cpf: "456.789.123-45",
                telefone: "(91) 97777-9999",
                email: "carlos.mendes@email.com",
                banco: "Banco do Brasil",
                tipoEmpreendimento: "Pecuária",
                dataInicio: "2025-01-10",
                status: "Documentação Pendente",
                planoSafra: "2025/2026",
                tipoProdutor: "Grande Produtor",
                sistemaProducao: "Intensivo",
                rotacaoPastagem: true,
                fontesRenda: ["Pecuária", "Arrendamento"],
                propriedades: [
                    {
                        nome: "Fazenda Santa Rita",
                        area: 2500,
                        municipio: "Redenção",
                        estado: "PA",
                        modulosFiscais: 75,
                        classificacao: "Grande Propriedade"
                    }
                ],
                impedimentos: [
                    {
                        tipo: "Documentação da terra pendente",
                        status: "Pendente",
                        dataResolucao: null,
                        observacoes: "Aguardando regularização no cartório"
                    }
                ]
            },
            {
                id: 4,
                nome: "Ana Paula Costa",
                cpf: "321.654.987-08",
                telefone: "(91) 96666-3333",
                email: "ana.costa@email.com",
                banco: "SICREDI",
                tipoEmpreendimento: "Agricultura",
                dataInicio: "2024-12-05",
                status: "Aprovado",
                planoSafra: "2024/2025",
                tipoProdutor: "Pronamp",
                sistemaProducao: "Semi-intensivo",
                rotacaoPastagem: false,
                fontesRenda: ["Agricultura", "Prestação de serviços"],
                propriedades: [
                    {
                        nome: "Sítio Boa Vista",
                        area: 80,
                        municipio: "Castanhal",
                        estado: "PA",
                        modulosFiscais: 30,
                        classificacao: "Pequena Propriedade"
                    }
                ],
                impedimentos: []
            },
            {
                id: 5,
                nome: "Roberto Alves Ferreira",
                cpf: "654.321.789-12",
                telefone: "(91) 95555-7777",
                email: "roberto.ferreira@email.com",
                banco: "Banco do Brasil",
                tipoEmpreendimento: "Piscicultura",
                dataInicio: "2025-01-20",
                status: "Em andamento",
                planoSafra: "2025/2026",
                tipoProdutor: "Pronaf",
                sistemaProducao: "Intensivo",
                rotacaoPastagem: false,
                fontesRenda: ["Piscicultura", "Aposentadoria"],
                propriedades: [
                    {
                        nome: "Piscicultura São José",
                        area: 15,
                        municipio: "Santarém",
                        estado: "PA",
                        modulosFiscais: 70,
                        classificacao: "Pequena Propriedade"
                    }
                ],
                impedimentos: [
                    {
                        tipo: "Licenças ambientais pendentes",
                        status: "Em andamento",
                        dataResolucao: null,
                        observacoes: "Licença de aquicultura em análise"
                    }
                ]
            }
        ];
    }

    saveData() {
        localStorage.setItem('creditoRuralClientes', JSON.stringify(this.clientes));
    }

    setTodayDate() {
        const today = new Date().toISOString().split('T')[0];
        const dataInicioInput = document.getElementById('dataInicioCliente');
        if (dataInicioInput) {
            dataInicioInput.value = today;
        }
    }

    setupEventListeners() {
        // Botões principais
        document.getElementById('novoClienteBtn').addEventListener('click', () => this.openNovoClienteModal());
        document.getElementById('relatoriosBtn').addEventListener('click', () => this.openRelatoriosModal());
        document.getElementById('resetarSistemaBtn').addEventListener('click', () => this.resetSystem());

        // Modais
        document.getElementById('closeModalCliente').addEventListener('click', () => this.closeModal('modalNovoCliente'));
        document.getElementById('closeModalRelatorios').addEventListener('click', () => this.closeModal('modalRelatorios'));
        document.getElementById('cancelarCliente').addEventListener('click', () => this.closeModal('modalNovoCliente'));

        // Formulário
        document.getElementById('formNovoCliente').addEventListener('submit', (e) => this.handleSubmitCliente(e));
        document.getElementById('adicionarPropriedade').addEventListener('click', () => this.adicionarPropriedade());
        document.getElementById('adicionarImpedimento').addEventListener('click', () => this.adicionarImpedimento());
        document.getElementById('adicionarFonteRenda').addEventListener('click', () => this.adicionarFonteRenda());
        document.getElementById('listaImpedimentos').addEventListener('click', (e) => {
            if (e.target.classList.contains('remover-impedimento')) {
                const idx = parseInt(e.target.dataset.idx);
                this.impedimentosTemp.splice(idx, 1);
                this.renderImpedimentos();
            }
        });
        document.getElementById('listaFontesRenda').addEventListener('click', (e) => {
            if (e.target.classList.contains('remover-fonte')) {
                const idx = parseInt(e.target.dataset.idx);
                this.fontesRendaTemp.splice(idx, 1);
                this.renderFontesRenda();
            }
        });

        // Filtros
        document.getElementById('filtroPlanoSafra').addEventListener('change', () => this.applyFilters());
        document.getElementById('filtroBanco').addEventListener('change', () => this.applyFilters());
        document.getElementById('filtroStatus').addEventListener('change', () => this.applyFilters());
        document.getElementById('filtroTexto').addEventListener('input', () => this.applyFilters());

        // Cálculo automático de classificação
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('propriedade-area') || e.target.classList.contains('propriedade-modulos')) {
                this.calcularClassificacao(e.target);
            }
        });

        // Fechar modal clicando fora
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal(e.target.id);
            }
        });

        document.getElementById('resetarSistemaBtn').addEventListener('click', () => {
            if (confirm('Tem certeza que deseja resetar o sistema? Todos os dados serão apagados!')) {
                localStorage.clear();
                this.showNotification('Sistema resetado! Recarregando...', 'success');
                setTimeout(() => location.reload(), 1000);
            }
        });
    }

    resetSystem() {
        if (confirm('Tem certeza que deseja resetar o sistema? Todos os dados serão perdidos.')) {
            localStorage.removeItem('creditoRuralClientes');
            this.clientes = this.getInitialData();
            this.currentClienteId = this.clientes.length + 1;
            this.saveData();
            this.updateUI();
            this.showNotification('Sistema resetado com sucesso!', 'success');
        }
    }

    openNovoClienteModal() {
        console.log('Tentando abrir modal novo cliente...');
        const modal = document.getElementById('modalNovoCliente');
        if (!modal) {
            console.error('Modal não encontrado!');
            return;
        }
        
        modal.style.display = 'block';
        modal.classList.add('active');
        
        this.resetForm();
        this.impedimentosTemp = [];
        this.renderImpedimentos();
        this.fontesRendaTemp = [];
        this.renderFontesRenda();
        
        console.log('Modal aberto com sucesso');
    }

    openRelatoriosModal() {
        console.log('Tentando abrir modal relatórios...');
        const modal = document.getElementById('modalRelatorios');
        if (!modal) {
            console.error('Modal de relatórios não encontrado!');
            return;
        }
        
        modal.style.display = 'block';
        modal.classList.add('active');
        console.log('Modal de relatórios aberto com sucesso');
    }

    closeModal(modalId) {
        console.log('Tentando fechar modal:', modalId);
        const modal = document.getElementById(modalId);
        if (!modal) {
            console.error('Modal não encontrado:', modalId);
            return;
        }
        
        modal.style.display = 'none';
        modal.classList.remove('active');
        
        if (modalId === 'modalNovoCliente') {
            this.resetForm();
            document.getElementById('clienteIdEdicao').value = '';
        }
        
        console.log('Modal fechado com sucesso');
    }

    resetForm() {
        document.getElementById('formNovoCliente').reset();
        this.setTodayDate();
        this.impedimentosTemp = [];
        this.renderImpedimentos();
        this.fontesRendaTemp = [];
        this.renderFontesRenda();
        document.getElementById('clienteIdEdicao').value = '';
        
        // Reseta propriedades para apenas uma
        const container = document.getElementById('propriedadesContainer');
        container.innerHTML = `
            <div class="propriedade-item">
                <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label">Nome da Propriedade</label>
                        <input type="text" class="form-control propriedade-nome" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Área (hectares)</label>
                        <input type="number" class="form-control propriedade-area" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Município</label>
                        <input type="text" class="form-control propriedade-municipio" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Estado</label>
                        <select class="form-control propriedade-estado" required>
                            <option value="">Selecione...</option>
                            <option value="PA">Pará</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="GO">Goiás</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="PR">Paraná</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="BA">Bahia</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="SP">São Paulo</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Módulos Fiscais (hectares)</label>
                        <input type="number" class="form-control propriedade-modulos" value="75" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Classificação</label>
                        <input type="text" class="form-control propriedade-classificacao" readonly>
                    </div>
                </div>
            </div>
        `;
    }

    adicionarPropriedade() {
        const container = document.getElementById('propriedadesContainer');
        const propriedadeHTML = `
            <div class="propriedade-item">
                <button type="button" class="remove-propriedade" onclick="this.parentElement.remove()">×</button>
                <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label">Nome da Propriedade</label>
                        <input type="text" class="form-control propriedade-nome" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Área (hectares)</label>
                        <input type="number" class="form-control propriedade-area" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Município</label>
                        <input type="text" class="form-control propriedade-municipio" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Estado</label>
                        <select class="form-control propriedade-estado" required>
                            <option value="">Selecione...</option>
                            <option value="PA">Pará</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="GO">Goiás</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="PR">Paraná</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="BA">Bahia</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="SP">São Paulo</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Módulos Fiscais (hectares)</label>
                        <input type="number" class="form-control propriedade-modulos" value="75" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Classificação</label>
                        <input type="text" class="form-control propriedade-classificacao" readonly>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', propriedadeHTML);
    }

    adicionarImpedimento() {
        const motivo = document.getElementById('novoImpedimentoMotivo').value.trim();
        if (motivo) {
            this.impedimentosTemp.push({ motivo });
            document.getElementById('novoImpedimentoMotivo').value = '';
            this.renderImpedimentos();
        }
    }

    adicionarFonteRenda() {
        const fonte = document.getElementById('novaFonteRenda').value.trim();
        if (fonte) {
            this.fontesRendaTemp.push(fonte);
            document.getElementById('novaFonteRenda').value = '';
            this.renderFontesRenda();
        }
    }

    renderImpedimentos() {
        const ul = document.getElementById('listaImpedimentos');
        ul.innerHTML = this.impedimentosTemp.map((imp, idx) =>
            `<li>${imp.motivo} <button type='button' class='remover-impedimento' data-idx='${idx}' style='margin-left:10px;'>Remover</button></li>`
        ).join('');
    }

    renderFontesRenda() {
        const ul = document.getElementById('listaFontesRenda');
        ul.innerHTML = this.fontesRendaTemp.map((f, idx) =>
            `<li>${f} <button type='button' class='remover-fonte' data-idx='${idx}' style='margin-left:10px;'>Remover</button></li>`
        ).join('');
    }

    calcularClassificacao(element) {
        const propriedadeItem = element.closest('.propriedade-item');
        const areaInput = propriedadeItem.querySelector('.propriedade-area');
        const modulosInput = propriedadeItem.querySelector('.propriedade-modulos');
        const classificacaoInput = propriedadeItem.querySelector('.propriedade-classificacao');

        const area = parseFloat(areaInput.value) || 0;
        const modulosFiscais = parseFloat(modulosInput.value) || 75;

        if (area > 0) {
            const numModulos = area / modulosFiscais;
            let classificacao;
            
            if (numModulos <= 4) {
                classificacao = "Pequena Propriedade";
            } else if (numModulos <= 15) {
                classificacao = "Média Propriedade";
            } else {
                classificacao = "Grande Propriedade";
            }
            
            classificacaoInput.value = classificacao;
        }
    }

    handleSubmitCliente(e) {
        e.preventDefault();
        const clienteData = this.getFormData();
        const validationErrors = this.validateClienteData(clienteData);

        if (validationErrors.length > 0) {
            this.showNotification(validationErrors.join('\n'), 'error');
            return;
        }

        const clienteId = document.getElementById('clienteIdEdicao').value;
        if (clienteId) {
            // Edição
            const index = this.clientes.findIndex(c => c.id === parseInt(clienteId));
            if (index !== -1) {
                this.clientes[index] = { ...this.clientes[index], ...clienteData };
                this.showNotification('Cliente atualizado com sucesso!');
            }
        } else {
            // Novo cliente
            clienteData.id = this.currentClienteId++;
            this.clientes.push(clienteData);
            this.showNotification('Cliente cadastrado com sucesso!');
        }

        this.saveData();
        this.updateUI();
        this.closeModal('modalNovoCliente');
        this.resetForm();
    }

    getFormData() {
        return {
            nome: document.getElementById('nomeCliente').value,
            cpf: document.getElementById('cpfCliente').value,
            telefone: document.getElementById('telefoneCliente').value,
            email: document.getElementById('emailCliente').value,
            banco: document.getElementById('bancoCliente').value,
            tipoEmpreendimento: document.getElementById('tipoEmpreendimento').value,
            dataInicio: document.getElementById('dataInicioCliente').value,
            status: document.getElementById('statusCliente').value,
            planoSafra: document.getElementById('planoSafraCliente').value,
            tipoProdutor: document.getElementById('tipoProdutor').value,
            sistemaProducao: document.getElementById('sistemaProducao').value,
            rotacaoPastagem: document.getElementById('rotacaoPastagem').value === 'true',
            propriedades: this.getPropriedadesData(),
            fontesRenda: [...this.fontesRendaTemp],
            observacoes: document.getElementById('observacoesCliente').value.trim(),
            impedimentos: [...this.impedimentosTemp]
        };
    }

    getPropriedadesData() {
        const propriedades = [];
        const containers = document.querySelectorAll('.propriedade-item');
        containers.forEach(container => {
            propriedades.push({
                nome: container.querySelector('.propriedade-nome').value,
                area: parseFloat(container.querySelector('.propriedade-area').value),
                municipio: container.querySelector('.propriedade-municipio').value,
                estado: container.querySelector('.propriedade-estado').value,
                modulosFiscais: parseFloat(container.querySelector('.propriedade-modulos').value),
                classificacao: container.querySelector('.propriedade-classificacao').value,
                car: container.querySelector('.propriedade-car') ? container.querySelector('.propriedade-car').value : ''
            });
        });
        return propriedades;
    }

    validateClienteData(cliente) {
        const errors = [];

        // Validar campos obrigatórios
        if (!cliente.nome || cliente.nome.trim().length < 3) {
            errors.push('Nome inválido (mínimo 3 caracteres)');
        }

        // Validar CPF (formato básico)
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        if (!cpfRegex.test(cliente.cpf)) {
            errors.push('CPF inválido (formato: 123.456.789-01)');
        }

        // Validar email (se fornecido)
        if (cliente.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(cliente.email)) {
                errors.push('Email inválido');
            }
        }

        // Validar telefone (se fornecido)
        if (cliente.telefone) {
            const telefoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
            if (!telefoneRegex.test(cliente.telefone)) {
                errors.push('Telefone inválido (formato: (99) 99999-9999)');
            }
        }

        // Validar propriedades
        if (!cliente.propriedades || cliente.propriedades.length === 0) {
            errors.push('Adicione pelo menos uma propriedade');
        } else {
            cliente.propriedades.forEach((prop, index) => {
                if (!prop.nome || prop.nome.trim().length < 3) {
                    errors.push(`Propriedade ${index + 1}: Nome inválido`);
                }
                if (!prop.area || prop.area <= 0) {
                    errors.push(`Propriedade ${index + 1}: Área inválida`);
                }
                if (!prop.municipio || prop.municipio.trim().length < 2) {
                    errors.push(`Propriedade ${index + 1}: Município inválido`);
                }
                if (!prop.estado || prop.estado.length !== 2) {
                    errors.push(`Propriedade ${index + 1}: Estado inválido`);
                }
            });
        }

        return errors;
    }

    updateUI() {
        this.updateKPIs();
        this.updateClientesTable();
    }

    updateKPIs() {
        const totalClientes = this.clientes.length;
        const clientesAndamento = this.clientes.filter(c => c.status === 'Em andamento').length;
        const clientesAprovados = this.clientes.filter(c => c.status === 'Aprovado').length;

        document.getElementById('totalClientes').textContent = totalClientes;
        document.getElementById('clientesAndamento').textContent = clientesAndamento;
        document.getElementById('clientesAprovados').textContent = clientesAprovados;
    }

    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    updateClientesTable() {
        const tbody = document.getElementById('tabelaClientesBody');
        const clientes = this.getFilteredClientes();
        
        if (clientes.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="8" class="empty-state">
                        <h3>Nenhum cliente encontrado</h3>
                        <p>Tente ajustar os filtros ou adicione um novo cliente</p>
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = clientes.map(cliente => {
            let bancoLogo = '';
            if (cliente.banco === 'Banco do Brasil') {
                bancoLogo = '<img src="assets/bb.png" alt="Banco do Brasil" class="banco-logo">';
            } else if (cliente.banco === 'SICREDI') {
                bancoLogo = '<img src="assets/sicredi.png" alt="Sicredi" class="banco-logo">';
            }
            return `
            <tr>
                <td>${cliente.nome}</td>
                <td>${cliente.cpf}</td>
                <td>${bancoLogo} <span class="banco-nome">${cliente.banco}</span></td>
                <td><span class="status ${cliente.status.toLowerCase().replace(/\s+/g, '-')}">${cliente.status}</span></td>
                <td>${cliente.planoSafra}</td>
                <td>${cliente.tipoProdutor}</td>
                <td>${this.formatDate(cliente.dataInicio)}</td>
                <td class="actions">
                    <button class="btn btn--xs btn--secondary" onclick="creditoRuralSystem.editCliente(${cliente.id})">
                        Editar
                    </button>
                    <button class="btn btn--xs btn--outline" onclick="creditoRuralSystem.deleteCliente(${cliente.id})">
                        Excluir
                    </button>
                </td>
            </tr>
            `;
        }).join('');
    }

    getFilteredClientes() {
        const planoSafra = document.getElementById('filtroPlanoSafra').value;
        const banco = document.getElementById('filtroBanco').value;
        const status = document.getElementById('filtroStatus').value;
        const texto = document.getElementById('filtroTexto').value.toLowerCase();

        return this.clientes.filter(cliente => {
            const matchPlanoSafra = !planoSafra || cliente.planoSafra === planoSafra;
            const matchBanco = !banco || cliente.banco === banco;
            const matchStatus = !status || cliente.status === status;
            const matchTexto = !texto || 
                cliente.nome.toLowerCase().includes(texto) || 
                cliente.cpf.includes(texto);

            return matchPlanoSafra && matchBanco && matchStatus && matchTexto;
        });
    }

    applyFilters() {
        this.updateClientesTable();
    }

    editCliente(id) {
        const cliente = this.clientes.find(c => c.id === id);
        if (!cliente) return;

        // Preenche o formulário com os dados do cliente
        document.getElementById('clienteIdEdicao').value = cliente.id;
        document.getElementById('nomeCliente').value = cliente.nome;
        document.getElementById('cpfCliente').value = cliente.cpf;
        document.getElementById('telefoneCliente').value = cliente.telefone;
        document.getElementById('emailCliente').value = cliente.email;
        document.getElementById('bancoCliente').value = cliente.banco;
        document.getElementById('tipoEmpreendimento').value = cliente.tipoEmpreendimento;
        document.getElementById('dataInicioCliente').value = cliente.dataInicio;
        document.getElementById('statusCliente').value = cliente.status;
        document.getElementById('planoSafraCliente').value = cliente.planoSafra;
        document.getElementById('tipoProdutor').value = cliente.tipoProdutor;
        document.getElementById('sistemaProducao').value = cliente.sistemaProducao;
        document.getElementById('rotacaoPastagem').value = cliente.rotacaoPastagem ? 'true' : 'false';

        // Propriedades
        const container = document.getElementById('propriedadesContainer');
        container.innerHTML = '';
        cliente.propriedades.forEach((p, idx) => {
            const propriedadeHTML = `
                <div class="propriedade-item">
                    <div class="form-grid">
                        <div class="form-group">
                            <label class="form-label">Nome da Propriedade</label>
                            <input type="text" class="form-control propriedade-nome" value="${p.nome}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Área (hectares)</label>
                            <input type="number" class="form-control propriedade-area" value="${p.area}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Município</label>
                            <input type="text" class="form-control propriedade-municipio" value="${p.municipio}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Estado</label>
                            <select class="form-control propriedade-estado" required>
                                <option value="">Selecione...</option>
                                <option value="PA" ${p.estado === 'PA' ? 'selected' : ''}>Pará</option>
                                <option value="MT" ${p.estado === 'MT' ? 'selected' : ''}>Mato Grosso</option>
                                <option value="GO" ${p.estado === 'GO' ? 'selected' : ''}>Goiás</option>
                                <option value="RS" ${p.estado === 'RS' ? 'selected' : ''}>Rio Grande do Sul</option>
                                <option value="PR" ${p.estado === 'PR' ? 'selected' : ''}>Paraná</option>
                                <option value="SC" ${p.estado === 'SC' ? 'selected' : ''}>Santa Catarina</option>
                                <option value="MS" ${p.estado === 'MS' ? 'selected' : ''}>Mato Grosso do Sul</option>
                                <option value="BA" ${p.estado === 'BA' ? 'selected' : ''}>Bahia</option>
                                <option value="MG" ${p.estado === 'MG' ? 'selected' : ''}>Minas Gerais</option>
                                <option value="SP" ${p.estado === 'SP' ? 'selected' : ''}>São Paulo</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Módulos Fiscais (hectares)</label>
                            <input type="number" class="form-control propriedade-modulos" value="${p.modulosFiscais}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Classificação</label>
                            <input type="text" class="form-control propriedade-classificacao" value="${p.classificacao}" readonly>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += propriedadeHTML;
        });

        // Abre o modal
        document.getElementById('modalNovoCliente').classList.add('active');

        // Carrega impedimentos
        this.impedimentosTemp = cliente.impedimentos ? [...cliente.impedimentos] : [];
        this.renderImpedimentos();

        // Carrega fontes de renda
        this.fontesRendaTemp = cliente.fontesRenda ? [...cliente.fontesRenda] : [];
        this.renderFontesRenda();

        // Carrega observações
        document.getElementById('observacoesCliente').value = cliente.observacoes || '';
    }

    deleteCliente(id) {
        if (confirm('Tem certeza que deseja excluir este cliente?')) {
            this.clientes = this.clientes.filter(c => c.id !== id);
            this.saveData();
            this.updateUI();
            this.showNotification('Cliente excluído com sucesso!', 'success');
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        // Remove any existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        document.body.appendChild(notification);

        // For error messages, keep them visible longer
        const timeout = type === 'error' ? 5000 : 3000;
        setTimeout(() => {
            notification.remove();
        }, timeout);
    }
}

// Funções globais para relatórios
function gerarRelatorioHTML(clientes, filtro) {
    let titulo = 'Todos os Clientes';
    if (filtro === 'emAndamento') titulo = 'Clientes em Andamento';
    if (filtro === 'aprovados') titulo = 'Clientes Aprovados';

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Relatório de Clientes - ${filtro}</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; }
                .header { text-align: center; margin-bottom: 20px; }
                .header h1 { color: #333; }
                .data { font-size: 0.9em; color: #666; margin-top: 5px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
                .status { display: inline-block; padding: 4px 8px; border-radius: 4px; color: white; font-weight: bold; }
                .status--em-andamento { background-color: #2196f3; }
                .status--aprovado { background-color: #4caf50; }
                .status--documentacao-pendente { background-color: #ff9800; }
                .status--pendente { background-color: #f44336; }
                .empty-state { text-align: center; padding: 50px 0; color: #888; }
                .empty-state h3 { margin-bottom: 10px; }
                .empty-state p { margin-bottom: 20px; }
                .actions { white-space: nowrap; }
                .btn { padding: 5px 10px; border-radius: 4px; cursor: pointer; text-decoration: none; display: inline-block; }
                .btn--xs { font-size: 0.8em; }
                .btn--secondary { background-color: #6c757d; color: white; }
                .btn--outline { background-color: transparent; border: 1px solid #6c757d; color: #6c757d; }
                .notification { position: fixed; top: 20px; right: 20px; background-color: #4caf50; color: white; padding: 15px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.2); z-index: 1000; }
                .notification--error { background-color: #f44336; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>${titulo}</h1>
                <p class="data">Data do relatório: ${new Date().toLocaleDateString()}</p>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Banco</th>
                        <th>Status</th>
                        <th>Plano Safra</th>
                        <th>Tipo Produtor</th>
                    </tr>
                </thead>
                <tbody>
                    ${clientes.map(cliente => `
                        <tr>
                            <td>${cliente.nome}</td>
                            <td>${cliente.cpf}</td>
                            <td>${cliente.banco}</td>
                            <td><span class="status ${cliente.status.toLowerCase().replace(/\s+/g, '-')}">${cliente.status}</span></td>
                            <td>${cliente.planoSafra}</td>
                            <td>${cliente.tipoProdutor}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <div style="margin-top: 20px;">
                <p>Total de clientes: ${clientes.length}</p>
            </div>
        </body>
        </html>
    `;

    return html;
}

// Função para gerar o relatório
function gerarRelatorio(filtro) {
    console.log('Gerando relatório:', filtro);
    let clientesFiltrados = window.creditoRuralSystem.clientes;

    if (filtro === 'emAndamento') {
        clientesFiltrados = clientesFiltrados.filter(c => c.status === 'Em andamento');
    } else if (filtro === 'aprovados') {
        clientesFiltrados = clientesFiltrados.filter(c => c.status === 'Aprovado');
    }

    const html = gerarRelatorioHTML(clientesFiltrados, filtro);
    const win = window.open('', '_blank');
    win.document.write(html);
    win.document.close();
}

// Inicializar o sistema quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, inicializando sistema...');
    window.creditoRuralSystem = new CreditoRuralSystem();
    window.creditoRuralSystem.init();
});

// Função global para gerar relatórios
window.gerarRelatorio = function(filtro) {
    console.log('Gerando relatório:', filtro);
    let clientesFiltrados = window.creditoRuralSystem.clientes;

    if (filtro === 'emAndamento') {
        clientesFiltrados = clientesFiltrados.filter(c => c.status === 'Em andamento');
    } else if (filtro === 'aprovados') {
        clientesFiltrados = clientesFiltrados.filter(c => c.status === 'Aprovado');
    }

    const html = gerarRelatorioHTML(clientesFiltrados, filtro);
    const win = window.open('', '_blank');
    win.document.write(html);
    win.document.close();
};