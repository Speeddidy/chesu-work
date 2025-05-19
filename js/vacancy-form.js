// Класс для управления данными формы вакансии
class VacancyFormManager {
  constructor() {
    this.formData = {
      // Основная информация
      title: '',
      specialization: '',
      experience: '',
      forGraduates: {
        categories: [],
        opportunities: [],
        benefits: []
      },
      
      // Условия работы
      employmentType: '',
      partTime: '',
      workFormat: [],
      
      // Формат найма
      internship: false,
      temporary: false,
      
      // График и часы работы
      schedule: [],
      workingHours: [],
      
      // Адрес и город
      cities: [],
      address: {
        type: 'none', // 'none' или 'specified'
        value: '',
        coordinates: null
      },
      
      // Оплата
      salary: {
        from: '',
        to: '',
        currency: '₽',
        period: 'За месяц',
        type: 'gross', // 'gross' или 'net'
        frequency: ''
      },
      
      // Описание
      description: {
        responsibilities: [],
        requirements: [],
        conditions: []
      },
      
      // Навыки
      skills: [],
      
      // Контакты
      contacts: {
        name: '',
        email: '',
        phone: '',
        telegram: '',
        whatsapp: ''
      }
    };

    this.initializeForm();
  }

  // Инициализация формы
  initializeForm() {
    // Загружаем сохраненные данные, если они есть
    const savedData = localStorage.getItem('vacancyDraft');
    if (savedData) {
      try {
        this.formData = JSON.parse(savedData);
        this.populateForm();
      } catch (e) {
        console.error('Ошибка при загрузке черновика:', e);
      }
    }

    // Устанавливаем обработчики событий
    this.setupEventListeners();
    
    // Устанавливаем значения по умолчанию
    this.setDefaultValues();
  }

  // Установка значений по умолчанию
  setDefaultValues() {
    // Опыт работы
    const noExperienceBtn = document.querySelector('.cj-btn-group .cj-btn');
    if (noExperienceBtn) {
      noExperienceBtn.classList.add('active');
      this.formData.experience = 'Нет опыта';
    }

    // Тип занятости
    const fullTimeBtn = document.querySelector('.create-job-section:nth-child(2) .cj-btn-group .cj-btn');
    if (fullTimeBtn) {
      fullTimeBtn.classList.add('active');
      this.formData.employmentType = 'Полная';
    }

    // Валюта и период
    this.formData.salary.currency = '₽';
    this.formData.salary.period = 'За месяц';
    this.formData.salary.type = 'gross';

    // Сохраняем начальное состояние
    this.saveDraft();
  }

  // Установка обработчиков событий
  setupEventListeners() {
    // Название вакансии
    const titleInput = document.querySelector('input[placeholder="Название вакансии"]');
    if (titleInput) {
      titleInput.addEventListener('input', (e) => {
        this.formData.title = e.target.value;
        this.saveDraft();
      });
    }

    // Специализация
    const specInput = document.getElementById('specialization-input');
    if (specInput) {
      specInput.addEventListener('input', (e) => {
        this.formData.specialization = e.target.value;
        this.saveDraft();
      });
    }

    // Опыт работы
    document.querySelectorAll('.create-job-section:first-child .cj-btn-group .cj-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.formData.experience = btn.textContent;
        this.saveDraft();
      });
    });

    // Тип занятости
    document.querySelectorAll('.create-job-section:nth-child(2) .cj-btn-group .cj-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.formData.employmentType = btn.textContent;
        this.saveDraft();
      });
    });

    // Формат работы (мультивыбор)
    document.querySelectorAll('#work-format-group .cj-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const format = btn.textContent;
        const index = this.formData.workFormat.indexOf(format);
        if (index === -1) {
          this.formData.workFormat.push(format);
        } else {
          this.formData.workFormat.splice(index, 1);
        }
        this.saveDraft();
      });
    });

    // Зарплата
    const salaryInputs = document.querySelectorAll('.job-salary-input');
    salaryInputs.forEach((input, index) => {
      input.addEventListener('input', (e) => {
        if (index === 0) {
          this.formData.salary.from = e.target.value;
        } else {
          this.formData.salary.to = e.target.value;
        }
        this.saveDraft();
      });
    });

    // Тип зарплаты (до вычета/на руки)
    document.querySelectorAll('.job-salary-type').forEach(btn => {
      btn.addEventListener('click', () => {
        this.formData.salary.type = btn.textContent === 'До вычета налогов' ? 'gross' : 'net';
        this.saveDraft();
      });
    });

    // Частота выплат
    document.querySelectorAll('.job-salary-freq').forEach(btn => {
      btn.addEventListener('click', () => {
        this.formData.salary.frequency = btn.textContent;
        this.saveDraft();
      });
    });

    // Описание вакансии
    const editor = document.getElementById('mini-editor');
    if (editor) {
      editor.addEventListener('input', () => {
        this.updateDescription();
        this.saveDraft();
      });
    }

    // Навыки
    const skillsInput = document.querySelector('#skills-multiselect input');
    if (skillsInput) {
      skillsInput.addEventListener('input', () => {
        this.updateSkills();
        this.saveDraft();
      });
    }

    // Контакты
    this.setupContactListeners();
  }

  // Обновление описания вакансии
  updateDescription() {
    const editor = document.getElementById('mini-editor');
    if (!editor) return;

    const sections = {
      responsibilities: [],
      requirements: [],
      conditions: []
    };

    let currentSection = null;
    editor.querySelectorAll('.editor-line').forEach(line => {
      const text = line.textContent.replace(/^[-—\s]+/, '').trim();
      if (text) {
        if (line.previousElementSibling?.textContent.includes('Обязанности')) {
          currentSection = 'responsibilities';
        } else if (line.previousElementSibling?.textContent.includes('Требования')) {
          currentSection = 'requirements';
        } else if (line.previousElementSibling?.textContent.includes('Условия')) {
          currentSection = 'conditions';
        }
        if (currentSection) {
          sections[currentSection].push(text);
        }
      }
    });

    this.formData.description = sections;
  }

  // Обновление навыков
  updateSkills() {
    const skillsTags = document.querySelectorAll('#skills-multiselect .multi-select-tag');
    this.formData.skills = Array.from(skillsTags).map(tag => tag.textContent);
  }

  // Настройка обработчиков для контактов
  setupContactListeners() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    // Заполняем контакты из данных пользователя
    this.formData.contacts = {
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      telegram: user.telegram || '',
      whatsapp: user.whatsapp || ''
    };

    // Обработчики для редактирования контактов
    document.getElementById('contact-save-btn')?.addEventListener('click', () => {
      this.formData.contacts = {
        name: document.getElementById('edit-contact-name')?.value || '',
        email: document.getElementById('edit-contact-email')?.value || '',
        phone: document.getElementById('edit-contact-phone')?.value || '',
        telegram: document.getElementById('edit-contact-telegram')?.value || '',
        whatsapp: document.getElementById('edit-contact-whatsapp')?.value || ''
      };
      this.saveDraft();
    });
  }

  // Заполнение формы данными
  populateForm() {
    // Название
    const titleInput = document.querySelector('input[placeholder="Название вакансии"]');
    if (titleInput) titleInput.value = this.formData.title;

    // Специализация
    const specInput = document.getElementById('specialization-input');
    if (specInput) specInput.value = this.formData.specialization;

    // Опыт работы
    document.querySelectorAll('.create-job-section:first-child .cj-btn-group .cj-btn').forEach(btn => {
      if (btn.textContent === this.formData.experience) {
        btn.classList.add('active');
      }
    });

    // Тип занятости
    document.querySelectorAll('.create-job-section:nth-child(2) .cj-btn-group .cj-btn').forEach(btn => {
      if (btn.textContent === this.formData.employmentType) {
        btn.classList.add('active');
      }
    });

    // Формат работы
    document.querySelectorAll('#work-format-group .cj-btn').forEach(btn => {
      if (this.formData.workFormat.includes(btn.textContent)) {
        btn.classList.add('active');
      }
    });

    // Зарплата
    const salaryInputs = document.querySelectorAll('.job-salary-input');
    if (salaryInputs[0]) salaryInputs[0].value = this.formData.salary.from;
    if (salaryInputs[1]) salaryInputs[1].value = this.formData.salary.to;

    // Тип зарплаты
    document.querySelectorAll('.job-salary-type').forEach(btn => {
      if ((btn.textContent === 'До вычета налогов' && this.formData.salary.type === 'gross') ||
          (btn.textContent === 'На руки' && this.formData.salary.type === 'net')) {
        btn.classList.add('active');
      }
    });

    // Частота выплат
    document.querySelectorAll('.job-salary-freq').forEach(btn => {
      if (btn.textContent === this.formData.salary.frequency) {
        btn.classList.add('active');
      }
    });

    // Контакты
    const contactName = document.getElementById('edit-contact-name');
    const contactEmail = document.getElementById('edit-contact-email');
    const contactPhone = document.getElementById('edit-contact-phone');
    const contactTelegram = document.getElementById('edit-contact-telegram');
    const contactWhatsapp = document.getElementById('edit-contact-whatsapp');

    if (contactName) contactName.value = this.formData.contacts.name;
    if (contactEmail) contactEmail.value = this.formData.contacts.email;
    if (contactPhone) contactPhone.value = this.formData.contacts.phone;
    if (contactTelegram) contactTelegram.value = this.formData.contacts.telegram;
    if (contactWhatsapp) contactWhatsapp.value = this.formData.contacts.whatsapp;
  }

  // Сохранение черновика
  saveDraft() {
    localStorage.setItem('vacancyDraft', JSON.stringify(this.formData));
  }

  // Очистка черновика
  clearDraft() {
    localStorage.removeItem('vacancyDraft');
    this.formData = this.getInitialState();
    this.populateForm();
  }

  // Получение начального состояния
  getInitialState() {
    return {
      title: '',
      specialization: '',
      experience: 'Нет опыта',
      forGraduates: {
        categories: [],
        opportunities: [],
        benefits: []
      },
      employmentType: 'Полная',
      partTime: '',
      workFormat: [],
      internship: false,
      temporary: false,
      schedule: [],
      workingHours: [],
      cities: [],
      address: {
        type: 'none',
        value: '',
        coordinates: null
      },
      salary: {
        from: '',
        to: '',
        currency: '₽',
        period: 'За месяц',
        type: 'gross',
        frequency: ''
      },
      description: {
        responsibilities: [],
        requirements: [],
        conditions: []
      },
      skills: [],
      contacts: {
        name: '',
        email: '',
        phone: '',
        telegram: '',
        whatsapp: ''
      }
    };
  }

  // Валидация формы
  validateForm() {
    const errors = [];

    if (!this.formData.title) errors.push('Название вакансии обязательно');
    if (!this.formData.specialization) errors.push('Специализация обязательна');
    if (!this.formData.employmentType) errors.push('Тип занятости обязателен');
    if (this.formData.workFormat.length === 0) errors.push('Выберите формат работы');
    if (this.formData.cities.length === 0) errors.push('Выберите город публикации');
    
    // Проверка описания
    const hasDescription = Object.values(this.formData.description).some(arr => arr.length > 0);
    if (!hasDescription) errors.push('Заполните описание вакансии');

    // Проверка контактов
    if (!this.formData.contacts.name) errors.push('Укажите имя контактного лица');
    if (!this.formData.contacts.phone) errors.push('Укажите контактный телефон');

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Публикация вакансии
  async publishVacancy() {
    const validation = this.validateForm();
    if (!validation.isValid) {
      return {
        success: false,
        errors: validation.errors
      };
    }

    try {
      // Здесь будет отправка данных на сервер
      const response = await fetch('/api/vacancies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.formData)
      });

      if (!response.ok) {
        throw new Error('Ошибка при публикации вакансии');
      }

      // Очищаем черновик после успешной публикации
      this.clearDraft();

      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        errors: [error.message]
      };
    }
  }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  window.vacancyForm = new VacancyFormManager();
}); 