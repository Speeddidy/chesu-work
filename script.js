let map;
let markers = [];
let modalMap;
let mapSelect;
let selectedCoordinates = null;
let selectedRole = "jobseeker";
let currentSection = "main";
let respondedJobs = JSON.parse(localStorage.getItem("respondedJobs") || "[]");
let isShowingFavorites = false;
let isShowingResponses = false;
let filteredJobs = []; // Глобальная переменная для хранения отфильтрованных вакансий

let jobs = [
  {
    title: "Программист Python",
    company: "ТехКорп",
    lat: 43.3178,
    lng: 45.6949,
    description: "ул. Мира",
    fullDescription:
      "Разработка серверной части приложений на Python, работа с Django и PostgreSQL.",
    city: "Грозный",
    salaryMin: 150000,
    salaryMax: 200000,
    experience: "3-6",
    employment: "full",
    schedule: "5/2",
    hours: "8",
    internship: "no",
    workFormat: "office",
    conditions: [
      "- Полный социальный пакет",
      "- Корпоративное обучение",
      "- Гибкое начало рабочего дня",
    ],
    responsibilities: [
      "- Разработка и поддержка серверной части приложений",
      "- Оптимизация производительности кода",
      "- Интеграция с внешними API",
    ],
    requirements: [
      "- Опыт работы с Python от 3 лет",
      "- Знание Django и PostgreSQL",
      "- Умение работать в команде",
    ],
    keySkills: ["Python", "Django", "PostgreSQL", "Git", "Командная работа"],
    createdBy: null,
  },
  {
    title: "Менеджер по продажам",
    company: "Грозненский завод",
    lat: 43.3265,
    lng: 45.6842,
    description: "пос. Гикало",
    fullDescription:
      "Работа с клиентами, обзвон, обработка заказов, подготовка документов.",
    city: "Грозный",
    salaryMin: 70000,
    salaryMax: null,
    experience: "1-3",
    employment: "full",
    schedule: "5/2",
    hours: "8",
    internship: "no",
    workFormat: "office",
    conditions: [
      "- Официальное оформление",
      "- Бонусы за выполнение плана",
      "- Корпоративный транспорт",
    ],
    responsibilities: [
      "- Поиск и привлечение клиентов",
      "- Ведение переговоров",
      "- Подготовка коммерческих предложений",
    ],
    requirements: [
      "- Опыт продаж от 1 года",
      "- Знание ПК и MS Office",
      "- Коммуникабельность",
    ],
    keySkills: ["Продажи", "MS Office", "Коммуникация", "Переговоры"],
    createdBy: null,
  },
  {
    title: "Флорист",
    company: "MyFlowers",
    lat: 43.3132,
    lng: 45.6971,
    description: "ул. Эсамбаева, 5",
    fullDescription:
      "Сборка цветочных композиций, работа с клиентами, обучение стилю компании.",
    city: "Грозный",
    salaryMin: 50000,
    salaryMax: 80000,
    experience: "noExperience",
    employment: "part",
    schedule: "flex",
    hours: "4-6",
    internship: "yes",
    workFormat: "office",
    conditions: [
      "- Гибкий график",
      "- Скидки на продукцию",
      "- Обучение за счет компании",
    ],
    responsibilities: [
      "- Создание букетов и композиций",
      "- Консультация клиентов",
      "- Уход за цветами",
    ],
    requirements: [
      "- Базовые навыки флористики или желание обучаться",
      "- Креативность",
      "- Доброжелательность",
    ],
    keySkills: ["Флористика", "Креативность", "Обслуживание клиентов"],
    createdBy: null,
  },
  {
    title: "Frontend разработчик",
    company: "WebStudio",
    lat: 43.3201,
    lng: 45.6905,
    description: "ул. Ленина, 10",
    fullDescription:
      "Разработка интерфейсов с использованием React и TypeScript.",
    city: "Грозный",
    salaryMin: 120000,
    salaryMax: 150000,
    experience: "1-3",
    employment: "full",
    schedule: "5/2",
    hours: "8",
    internship: "no",
    workFormat: "remote",
    conditions: [
      "- Удаленная работа",
      "- Техническое обеспечение",
      "- Гибкий график",
    ],
    responsibilities: [
      "- Разработка пользовательских интерфейсов",
      "- Оптимизация фронтенд-кода",
      "- Взаимодействие с дизайнерами",
    ],
    requirements: [
      "- Опыт с React и TypeScript от 1 года",
      "- Знание HTML и CSS",
      "- Понимание REST API",
    ],
    keySkills: ["React", "TypeScript", "HTML", "CSS", "REST API"],
    createdBy: null,
  },
  {
    title: "Графический дизайнер",
    company: "CreativeLab",
    lat: 43.315,
    lng: 45.7002,
    description: "ул. Победы, 15",
    fullDescription:
      "Создание визуального контента, брендинга и рекламных материалов.",
    city: "Грозный",
    salaryMin: 80000,
    salaryMax: null,
    experience: "1-3",
    employment: "full",
    schedule: "5/2",
    hours: "8",
    internship: "no",
    workFormat: "hybrid",
    conditions: [
      "- Гибридный формат работы",
      "- Корпоративные скидки",
      "- Творческая свобода",
    ],
    responsibilities: [
      "- Разработка дизайна для рекламы",
      "- Создание брендинга",
      "- Подготовка макетов",
    ],
    requirements: [
      "- Опыт работы от 1 года",
      "- Владение Adobe Photoshop и Illustrator",
      "- Портфолио",
    ],
    keySkills: ["Adobe Photoshop", "Illustrator", "Брендинг", "Креативность"],
    createdBy: null,
  },
  {
    title: "Бухгалтер",
    company: "ФинансГрупп",
    lat: 43.319,
    lng: 45.688,
    description: "ул. Советская, 20",
    fullDescription: "Ведение бухгалтерского учета, подготовка отчетности.",
    city: "Грозный",
    salaryMin: 65000,
    salaryMax: 90000,
    experience: "1-3",
    employment: "full",
    schedule: "5/2",
    hours: "8",
    internship: "no",
    workFormat: "office",
    conditions: [
      "- Официальное оформление",
      "- Стабильная зарплата",
      "- Корпоративный транспорт",
    ],
    responsibilities: [
      "- Ведение бухгалтерского учета",
      "- Подготовка налоговой отчетности",
      "- Работа с 1С",
    ],
    requirements: ["- Опыт работы от 2 лет", "- Знание 1С", "- Внимательность"],
    keySkills: ["1С", "Бухгалтерский учет", "Налоговая отчетность"],
    createdBy: null,
  },
  {
    title: "Маркетолог",
    company: "PromoAgency",
    lat: 43.3125,
    lng: 45.695,
    description: "ул. Центральная, 7",
    fullDescription:
      "Разработка и реализация маркетинговых кампаний, анализ рынка.",
    city: "Грозный",
    salaryMin: 90000,
    salaryMax: null,
    experience: "3-6",
    employment: "full",
    schedule: "5/2",
    hours: "8",
    internship: "no",
    workFormat: "office",
    conditions: [
      "- Официальное оформление",
      "- Возможность карьерного роста",
      "- Корпоративное обучение",
    ],
    responsibilities: [
      "- Разработка маркетинговых стратегий",
      "- Анализ рынка",
      "- Управление рекламными кампаниями",
    ],
    requirements: [
      "- Опыт в digital-маркетинге от 3 лет",
      "- Знание Google Analytics",
      "- Аналитическое мышление",
    ],
    keySkills: [
      "Digital-маркетинг",
      "Google Analytics",
      "Аналитика",
      "Креативность",
    ],
    createdBy: null,
  },
  {
    title: "Официант",
    company: "Кафе Вечер",
    lat: 43.3145,
    lng: 45.693,
    description: "ул. Гагарина, 12",
    fullDescription: "Обслуживание гостей, прием заказов, поддержание чистоты.",
    city: "Грозный",
    salaryMin: 40000,
    salaryMax: 60000,
    experience: "noExperience",
    employment: "part",
    schedule: "2/2",
    hours: "6-8",
    internship: "yes",
    workFormat: "office",
    conditions: ["- Чаевые", "- Бесплатное питание", "- Гибкий график"],
    responsibilities: [
      "- Обслуживание гостей",
      "- Прием заказов",
      "- Поддержание чистоты зала",
    ],
    requirements: ["- Доброжелательность", "- Ответственность", "- Без опыта"],
    keySkills: ["Обслуживание клиентов", "Коммуникация", "Ответственность"],
    createdBy: null,
  },
  {
    title: "Системный администратор",
    company: "IT Solutions",
    lat: 43.318,
    lng: 45.692,
    description: "ул. Маяковского, 3",
    fullDescription: "Обслуживание серверов, настройка сетевого оборудования.",
    city: "Грозный",
    salaryMin: 110000,
    salaryMax: 130000,
    experience: "3-6",
    employment: "full",
    schedule: "5/2",
    hours: "8",
    internship: "no",
    workFormat: "office",
    conditions: [
      "- Полный социальный пакет",
      "- Корпоративное обучение",
      "- Современное оборудование",
    ],
    responsibilities: [
      "- Настройка серверов",
      "- Обслуживание сетей",
      "- Обеспечение безопасности",
    ],
    requirements: [
      "- Опыт работы с Linux/Windows от 3 лет",
      "- Знание сетевых протоколов",
      "- Ответственность",
    ],
    keySkills: ["Linux", "Windows", "Сетевые протоколы", "Безопасность"],
    createdBy: null,
  },
  {
    title: "HR-менеджер",
    company: "PeopleCorp",
    lat: 43.3165,
    lng: 45.6895,
    description: "ул. Южная, 8",
    fullDescription:
      "Подбор персонала, проведение собеседований, адаптация сотрудников.",
    city: "Грозный",
    salaryMin: 75000,
    salaryMax: null,
    experience: "1-3",
    employment: "full",
    schedule: "5/2",
    hours: "8",
    internship: "no",
    workFormat: "office",
    conditions: [
      "- Официальное оформление",
      "- Корпоративные мероприятия",
      "- Возможность роста",
    ],
    responsibilities: [
      "- Подбор персонала",
      "- Проведение собеседований",
      "- Адаптация новых сотрудников",
    ],
    requirements: [
      "- Опыт в HR от 2 лет",
      "- Знание трудового законодательства",
      "- Коммуникабельность",
    ],
    keySkills: ["Рекрутинг", "Коммуникация", "Трудовое законодательство"],
    createdBy: null,
  },
  {
    title: "Курьер",
    company: "Доставка+",
    lat: 43.313,
    lng: 45.696,
    description: "ул. Северная, 4",
    fullDescription: "Доставка заказов по городу, работа с приложением.",
    city: "Грозный",
    salaryMin: 45000,
    salaryMax: 70000,
    experience: "noExperience",
    employment: "part",
    schedule: "flex",
    hours: "4-6",
    internship: "no",
    workFormat: "office",
    conditions: [
      "- Гибкий график",
      "- Компенсация транспорта",
      "- Бонусы за заказы",
    ],
    responsibilities: [
      "- Доставка заказов",
      "- Работа с приложением",
      "- Взаимодействие с клиентами",
    ],
    requirements: ["- Личный транспорт", "- Ответственность", "- Без опыта"],
    keySkills: [
      "Ответственность",
      "Водительские навыки",
      "Клиентоориентированность",
    ],
    createdBy: null,
  },
  {
    title: "Копирайтер",
    company: "ContentHub",
    lat: 43.317,
    lng: 45.698,
    description: "ул. Пушкина, 9",
    fullDescription: "Написание текстов для сайтов и социальных сетей.",
    city: "Грозный",
    salaryMin: 60000,
    salaryMax: null,
    experience: "1-3",
    employment: "remote",
    schedule: "flex",
    hours: "6-8",
    internship: "no",
    workFormat: "remote",
    conditions: [
      "- Удаленная работа",
      "- Гибкий график",
      "- Творческая свобода",
    ],
    responsibilities: [
      "- Написание текстов",
      "- Редактирование контента",
      "- Работа с SEO",
    ],
    requirements: [
      "- Опыт написания текстов от 1 года",
      "- Грамотность",
      "- Знание SEO",
    ],
    keySkills: ["Копирайтинг", "SEO", "Грамотность", "Креативность"],
    createdBy: null,
  },
  {
    title: "Повар",
    company: "Ресторан Гурман",
    lat: 43.3155,
    lng: 45.691,
    description: "ул. Чехова, 6",
    fullDescription:
      "Приготовление блюд, соблюдение рецептур, поддержание чистоты.",
    city: "Грозный",
    salaryMin: 55000,
    salaryMax: 75000,
    experience: "1-3",
    employment: "full",
    schedule: "2/2",
    hours: "8",
    internship: "no",
    workFormat: "office",
    conditions: [
      "- Бесплатное питание",
      "- Форма от компании",
      "- Стабильный график",
    ],
    responsibilities: [
      "- Приготовление блюд",
      "- Соблюдение санитарных норм",
      "- Работа в команде",
    ],
    requirements: [
      "- Опыт работы поваром от 1 года",
      "- Знание рецептур",
      "- Ответственность",
    ],
    keySkills: ["Кулинария", "Санитарные нормы", "Командная работа"],
    createdBy: null,
  },
];

function filledCell(cell) {
  return cell !== "" && cell != null;
}

function loadFileData(filename) {
  if (gk_isXlsx && gk_xlsxFileLookup[filename]) {
    try {
      const workbook = XLSX.read(gk_fileData[filename], { type: "base64" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        blankrows: false,
        defval: "",
      });
      const filteredData = jsonData.filter((row) => row.some(filledCell));
      const headerRowIndex =
        filteredData.findIndex(
          (row, index) =>
            row.filter(filledCell).length >=
            filteredData[index + 1]?.filter(filledCell).length
        ) || 0;
      const csv = XLSX.utils.sheet_to_csv(
        XLSX.utils.aoa_to_sheet(filteredData.slice(headerRowIndex)),
        { header: 1 }
      );
      return csv;
    } catch (e) {
      console.error("Ошибка обработки XLSX:", e);
      return "";
    }
  }
  return gk_fileData[filename] || "";
}

function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.classList.add("active");
  setTimeout(() => notification.classList.remove("active"), 3000);
}

window.onload = function () {
  console.log("Инициализация страницы...");
  updateHeader();
  if (typeof L === "undefined") {
    console.error("Leaflet не загружен");
    document.getElementById("map-error").classList.add("visible");
    showNotification("Не удалось загрузить карту");
    return;
  }

  map = L.map("map", {
    center: [43.3178, 45.6949],
    zoom: 12,
    zoomControl: true,
  });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(map);
  setTimeout(() => map.invalidateSize(), 300);
  updateJobList();
  updateMap(jobs);
  loadFavorites();
  initSkillsAutocomplete();
  initAddressAutocomplete();

  document
    .getElementById("job-list")
    .addEventListener("click", handleJobCardClick);
  document
    .getElementById("responses-list")
    .addEventListener("click", handleJobCardClick);

  const searchInput = document.getElementById("search-input");
  const clearInput = document.getElementById("clear-input");
  searchInput.addEventListener("input", function () {
    clearInput.classList.toggle("visible", searchInput.value.length > 0);
  });

  document
    .getElementById("create-job-form")
    .addEventListener("submit", createJob);
};

function initSkillsAutocomplete() {
  const skillsInput = document.getElementById("job-key-skills-input");
  const suggestionsList = document.getElementById("skills-suggestions");
  const selectedSkillsContainer = document.getElementById("selected-skills");
  let selectedSkills = [];
  let focusedSuggestionIndex = -1;

  function updateSuggestions(query) {
    suggestionsList.innerHTML = "";
    focusedSuggestionIndex = -1;
    if (query) {
      const filteredSkills = availableSkills.filter(
        (skill) =>
          skill.toLowerCase().includes(query.toLowerCase()) &&
          !selectedSkills.includes(skill)
      );
      filteredSkills.forEach((skill) => {
        const li = document.createElement("li");
        li.textContent = skill;
        li.addEventListener("click", () => {
          if (!selectedSkills.includes(skill)) {
            selectedSkills.push(skill);
            updateSelectedSkills();
            skillsInput.value = "";
            suggestionsList.classList.remove("visible");
          }
        });
        suggestionsList.appendChild(li);
      });
      suggestionsList.classList.toggle("visible", filteredSkills.length > 0);
    } else {
      suggestionsList.classList.remove("visible");
    }
  }

  function updateSelectedSkills() {
    selectedSkillsContainer.innerHTML = "";
    selectedSkills.forEach((skill) => {
      const tag = document.createElement("span");
      tag.className = "skill-tag";
      tag.innerHTML = `${skill} <span class="remove-skill">×</span>`;
      tag.querySelector(".remove-skill").addEventListener("click", () => {
        selectedSkills = selectedSkills.filter((s) => s !== skill);
        updateSelectedSkills();
      });
      selectedSkillsContainer.appendChild(tag);
    });
  }

  function highlightSuggestion(index) {
    const suggestions = suggestionsList.querySelectorAll("li");
    suggestions.forEach((li, i) => {
      li.classList.toggle("highlighted", i === index);
    });
  }

  skillsInput.addEventListener("input", () => {
    updateSuggestions(skillsInput.value);
  });

  skillsInput.addEventListener("keydown", (e) => {
    const suggestions = suggestionsList.querySelectorAll("li");
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (suggestions.length > 0) {
        focusedSuggestionIndex =
          (focusedSuggestionIndex + 1) % suggestions.length;
        highlightSuggestion(focusedSuggestionIndex);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (focusedSuggestionIndex >= 0 && suggestions[focusedSuggestionIndex]) {
        const skill = suggestions[focusedSuggestionIndex].textContent;
        if (!selectedSkills.includes(skill)) {
          selectedSkills.push(skill);
          updateSelectedSkills();
          skillsInput.value = "";
          suggestionsList.classList.remove("visible");
        }
      } else if (skillsInput.value) {
        const skill = skillsInput.value.trim();
        if (!selectedSkills.includes(skill)) {
          selectedSkills.push(skill);
          updateSelectedSkills();
          skillsInput.value = "";
          suggestionsList.classList.remove("visible");
        }
      }
    }
  });

  document.addEventListener("click", (e) => {
    if (
      !skillsInput.contains(e.target) &&
      !suggestionsList.contains(e.target)
    ) {
      suggestionsList.classList.remove("visible");
    }
  });

  window.getSelectedSkills = () => selectedSkills;
}

function initAddressAutocomplete() {
  const addressInput = document.getElementById("job-address");
  const suggestionsList = document.getElementById("address-suggestions");
  let debounceTimer;
  let focusedSuggestionIndex = -1;

  async function fetchAddressSuggestions(query) {
    if (!query) {
      suggestionsList.classList.remove("visible");
      return;
    }
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query + ", Грозный"
        )}&limit=5&addressdetails=1`
      );
      const data = await response.json();
      suggestionsList.innerHTML = "";
      focusedSuggestionIndex = -1;
      data.forEach((item) => {
        const address = item.address;
        const addressParts = [];
        if (address.amenity) addressParts.push(address.amenity);
        if (address.shop) addressParts.push(address.shop);
        if (address.university) addressParts.push(address.university);
        if (address.road) addressParts.push(address.road);
        if (address.house_number) addressParts.push(address.house_number);
        addressParts.push("Грозный");
        const displayAddress = addressParts.join(", ");

        const li = document.createElement("li");
        li.textContent = displayAddress;
        li.addEventListener("click", () => {
          addressInput.value = displayAddress;
          suggestionsList.classList.remove("visible");
        });
        suggestionsList.appendChild(li);
      });
      suggestionsList.classList.toggle("visible", data.length > 0);
    } catch (error) {
      console.error("Ошибка при получении адресов:", error);
    }
  }

  function highlightSuggestion(index) {
    const suggestions = suggestionsList.querySelectorAll("li");
    suggestions.forEach((li, i) => {
      li.classList.toggle("highlighted", i === index);
    });
  }

  addressInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      fetchAddressSuggestions(addressInput.value);
    }, 300);
  });

  addressInput.addEventListener("keydown", (e) => {
    const suggestions = suggestionsList.querySelectorAll("li");
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (suggestions.length > 0) {
        focusedSuggestionIndex =
          (focusedSuggestionIndex + 1) % suggestions.length;
        highlightSuggestion(focusedSuggestionIndex);
      }
    } else if (
      e.key === "Enter" &&
      focusedSuggestionIndex >= 0 &&
      suggestions[focusedSuggestionIndex]
    ) {
      e.preventDefault();
      addressInput.value = suggestions[focusedSuggestionIndex].textContent;
      suggestionsList.classList.remove("visible");
    }
  });

  document.addEventListener("click", (e) => {
    if (
      !addressInput.contains(e.target) &&
      !suggestionsList.contains(e.target)
    ) {
      suggestionsList.classList.remove("visible");
    }
  });
}

function openMapSelectModal() {
  const modal = document.getElementById("map-select-modal");
  const modalContent = modal.querySelector(".modal-content");
  modal.style.display = "flex";
  setTimeout(() => modalContent.classList.add("active"), 10);

  if (mapSelect) {
    mapSelect.remove();
  }
  mapSelect = L.map("map-select", { zoomControl: true }).setView(
    [43.3178, 45.6949],
    12
  );
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(mapSelect);

  setTimeout(() => mapSelect.invalidateSize(), 300);

  mapSelect.on("click", async function (e) {
    const { lat, lng } = e.latlng;
    selectedCoordinates = { lat, lng };

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      const addressParts = [];
      if (data.address.road) addressParts.push(data.address.road);
      if (data.address.house_number)
        addressParts.push(data.address.house_number);
      addressParts.push("Грозный");
      const displayAddress = addressParts.join(", ") || "Грозный";
      document.getElementById("job-address").value = displayAddress;

      // Удаляем предыдущие маркеры
      mapSelect.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapSelect.removeLayer(layer);
        }
      });

      // Добавляем новый маркер
      L.marker([lat, lng])
        .addTo(mapSelect)
        .bindPopup(displayAddress)
        .openPopup();

      // Закрываем модальное окно
      closeModal("map-select-modal");
    } catch (error) {
      console.error("Ошибка при обратном геокодировании:", error);
      showNotification("Ошибка при получении адреса. Попробуйте снова.");
    }
  });
}

function handleJobCardClick(e) {
  const card = e.target.closest(".job-card");
  if (
    !card ||
    e.target.classList.contains("favorite") ||
    e.target.closest(".favorite") ||
    e.target.classList.contains("respond-btn") ||
    e.target.classList.contains("track-btn") ||
    e.target.classList.contains("remove-btn")
  )
    return;

  const title = card.getAttribute("data-title");
  const job = jobs.find((j) => j.title === title);
  if (job) {
    const salary = formatSalary(job.salaryMin, job.salaryMax);
    openJobModal(
      job.title,
      job.company,
      salary,
      job.fullDescription,
      job.experience,
      job.employment,
      job.schedule,
      job.hours,
      job.internship,
      job.workFormat,
      job.conditions,
      job.responsibilities,
      job.requirements,
      job.keySkills
    );
  }
}

function openJobModalFromResponses(e) {
  const card = e.target.closest(".job-card");
  if (
    !card ||
    e.target.classList.contains("favorite") ||
    e.target.closest(".favorite") ||
    e.target.classList.contains("remove-btn")
  )
    return;

  const title = card.getAttribute("data-title");
  const job = jobs.find((j) => j.title === title);
  if (job) {
    const salary = formatSalary(job.salaryMin, job.salaryMax);
    openJobModal(
      job.title,
      job.company,
      salary,
      job.fullDescription,
      job.experience,
      job.employment,
      job.schedule,
      job.hours,
      job.internship,
      job.workFormat,
      job.conditions,
      job.responsibilities,
      job.requirements,
      job.keySkills
    );
  }
}

function showSection(section) {
  currentSection = section;
  document
    .querySelectorAll(".main-section, .auth-section, .responses-section")
    .forEach((s) => s.classList.remove("active"));
  document.querySelector(`#${section}-section`).classList.add("active");
  document
    .querySelectorAll(".main-header, .auth-header")
    .forEach((h) => (h.style.display = "none"));
  document.getElementById("main-header").style.display =
    section === "auth" ? "none" : "flex";
  document.getElementById("auth-header").style.display =
    section === "auth" ? "flex" : "none";
  if (section === "main" && map) {
    setTimeout(() => map.invalidateSize(), 300);
  }
  document
    .querySelector("#header-nav .fa-heart")
    .classList.toggle("active", isShowingFavorites);
  document
    .querySelector("#header-nav .fa-check")
    .classList.toggle("active", isShowingResponses);
}

function toggleProfileMenu() {
  const profileMenu = document.getElementById("profile-menu");
  profileMenu.classList.toggle("active");
}

document.addEventListener("click", function (e) {
  const profileMenu = document.getElementById("profile-menu");
  const authLink = document.getElementById("auth-link");
  if (
    profileMenu &&
    authLink &&
    !profileMenu.contains(e.target) &&
    !authLink.contains(e.target)
  ) {
    profileMenu.classList.remove("active");
  }
});

function updateHeader() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const authLink = document.getElementById("auth-link");
  if (!authLink) return;

  if (currentUser.email) {
    // Пользователь авторизован
    authLink.innerHTML = '<i class="fa-regular fa-user"></i>';
    authLink.title = "Профиль";
    authLink.onclick = function (e) {
      e.preventDefault();
      const profileMenu = document.getElementById("profile-menu");
      if (profileMenu) {
        profileMenu.classList.toggle("active");
      }
    };

    // Обновляем информацию в профильном меню
    const profileName = document.getElementById("profile-name");
    const profileEmail = document.getElementById("profile-email");
    if (profileName) profileName.textContent = currentUser.name || "";
    if (profileEmail) profileEmail.textContent = currentUser.email || "";
  } else {
    // Пользователь не авторизован
    authLink.textContent = "ВОЙТИ";
    authLink.title = "";
    authLink.onclick = function (e) {
      e.preventDefault();
      window.location.href = "auth.html";
    };
  }
}

function openCreateJobModal() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  if (!currentUser.email || currentUser.role !== "employer") {
    showNotification("Только работодатели могут создавать вакансии");
    return;
  }
  const modal = document.getElementById("create-job-modal");
  const modalContent = modal.querySelector(".modal-content");
  modal.style.display = "flex";
  setTimeout(() => modalContent.classList.add("active"), 10);
}

async function createJob(e) {
  e.preventDefault();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  if (!currentUser.email || currentUser.role !== "employer") {
    showNotification("Только работодатели могут создавать вакансии");
    return;
  }

  const title = document.getElementById("job-title").value.trim();
  const company = document.getElementById("job-company").value.trim();
  const salaryMin = parseInt(document.getElementById("job-salary-min").value);
  const salaryMax = document.getElementById("job-salary-max").value
    ? parseInt(document.getElementById("job-salary-max").value)
    : null;
  const experience = document.getElementById("job-experience").value;
  const employment = document.getElementById("job-employment").value;
  const schedule = document.getElementById("job-schedule").value;
  const hours = document.getElementById("job-hours").value;
  const internship = document.getElementById("job-internship").value;
  const workFormat = document.getElementById("job-work-format").value;
  const fullDescription = document
    .getElementById("job-description")
    .value.trim();
  const conditions = document
    .getElementById("job-conditions")
    .value.trim()
    .split("\n")
    .map((c) => `- ${c.trim()}`)
    .filter((c) => c !== "- ");
  const responsibilities = document
    .getElementById("job-responsibilities")
    .value.trim()
    .split("\n")
    .map((r) => `- ${r.trim()}`)
    .filter((r) => r !== "- ");
  const requirements = document
    .getElementById("job-requirements")
    .value.trim()
    .split("\n")
    .map((r) => `- ${r.trim()}`)
    .filter((r) => r !== "- ");
  const keySkills = window.getSelectedSkills();
  const address = document.getElementById("job-address").value.trim();

  if (
    !title ||
    !company ||
    !salaryMin ||
    !fullDescription ||
    !address ||
    keySkills.length === 0
  ) {
    showNotification(
      "Заполните все обязательные поля, включая ключевые навыки"
    );
    return;
  }

  let lat, lng;
  if (selectedCoordinates) {
    // Используем координаты, выбранные на карте
    lat = selectedCoordinates.lat;
    lng = selectedCoordinates.lng;
  } else {
    // Пытаемся получить координаты через геокодирование адреса
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      );
      const data = await response.json();
      if (data.length === 0) {
        showNotification("Не удалось найти адрес. Попробуйте другой формат.");
        return;
      }
      lat = parseFloat(data[0].lat);
      lng = parseFloat(data[0].lon);
    } catch (error) {
      console.error("Ошибка геокодирования:", error);
      showNotification("Ошибка при создании вакансии. Проверьте адрес.");
      return;
    }
  }

  const newJob = {
    title,
    company,
    lat,
    lng,
    description: address,
    fullDescription,
    city: "Грозный",
    salaryMin,
    salaryMax,
    experience,
    employment,
    schedule,
    hours,
    internship,
    workFormat,
    conditions,
    responsibilities,
    requirements,
    keySkills,
    createdBy: currentUser.email,
  };

  jobs.push(newJob);
  closeModal("create-job-modal");
  document.getElementById("create-job-form").reset();
  document.getElementById("selected-skills").innerHTML = "";
  selectedCoordinates = null; // Сбрасываем выбранные координаты

  if (isShowingFavorites) {
    showFavorites();
  } else if (isShowingResponses) {
    showResponses();
  } else {
    updateJobList(jobs);
    updateMap(jobs);
  }

  showNotification(`Вакансия "${title}" успешно создана`);
}

function handleLogout() {
  localStorage.removeItem("currentUser");
  const profileMenu = document.getElementById("profile-menu");
  if (profileMenu) profileMenu.classList.remove("active");
  updateHeader();
  window.location.href = "auth.html";
}

// Добавляем обработчик события для кнопки выхода
document.addEventListener("DOMContentLoaded", function () {
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.onclick = function (e) {
      e.preventDefault();
      handleLogout();
    };
  }

  // Проверяем наличие сохраненного пользователя при загрузке страницы
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  if (currentUser.email) {
    updateHeader();
  }
});

function showTab(tab) {
  document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.remove("active"));
  document
    .querySelectorAll(".auth-form")
    .forEach((f) => f.classList.remove("active"));
  document
    .querySelector(`.tab[onclick="showTab('${tab}')"]`)
    .classList.add("active");
  document.getElementById(`${tab}-form`).classList.add("active");
  document.getElementById(`${tab}-error`).style.display = "none";
}

function selectRole(role) {
  selectedRole = role;
  document
    .querySelectorAll(".role-btn")
    .forEach((btn) => btn.classList.remove("active"));
  document.getElementById(`role-${role}`).classList.add("active");
}

function handleLogin() {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  const error = document.getElementById("login-error");
  const users = JSON.parse(localStorage.getItem("users") || "{}");

  if (users[email] && users[email].password === password) {
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ email, name: users[email].name, role: selectedRole })
    );
    showSection("main");
    updateHeader();
    showNotification("Вход успешен");
  } else {
    error.style.display = "block";
  }
}

function handleRegister() {
  const name = document.getElementById("register-name").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value;
  const error = document.getElementById("register-error");
  let users = JSON.parse(localStorage.getItem("users") || "{}");

  if (users[email]) {
    error.style.display = "block";
    return;
  }

  users[email] = { name, password, role: selectedRole };
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem(
    "currentUser",
    JSON.stringify({ email, name, role: selectedRole })
  );
  showSection("main");
  updateHeader();
  showNotification("Регистрация успешна");
}

function formatSalary(min, max) {
  if (max) {
    return `${min.toLocaleString()} – ${max.toLocaleString()} ₽`;
  }
  return `от ${min.toLocaleString()} ₽`;
}

function updateJobList(filteredJobs = jobs) {
  const jobList = document.getElementById("vacancy-list");
  jobList.innerHTML = "";

  if (isShowingFavorites) {
    const favoritesTitle = document.createElement("h2");
    favoritesTitle.className = "favorites-title";
    favoritesTitle.textContent = "Избранные вакансии";
    jobList.appendChild(favoritesTitle);
  }

  filteredJobs.forEach((job) => {
    const card = document.createElement("div");
    card.className = "vacancy-card";
    card.setAttribute("data-title", job.title);
    card.setAttribute("data-company", job.company);
    card.setAttribute("data-description", job.fullDescription);
    card.setAttribute("data-city", job.city);
    card.setAttribute("data-salary-min", job.salaryMin);
    card.setAttribute("data-salary-max", job.salaryMax || "");
    card.setAttribute("data-experience", job.experience);
    card.setAttribute("data-employment", job.employment);
    card.setAttribute("data-schedule", job.schedule);
    card.setAttribute("data-hours", job.hours);
    card.setAttribute("data-internship", job.internship);
    card.setAttribute("data-work-format", job.workFormat);
    card.setAttribute("data-lat", job.lat);
    card.setAttribute("data-lng", job.lng);

    // Форматируем зарплату
    let salaryText = "";
    if (job.salaryMin && job.salaryMax) {
      salaryText = `${job.salaryMin.toLocaleString()} – ${job.salaryMax.toLocaleString()} ₽ за месяц`;
    } else if (job.salaryMin) {
      salaryText = `от ${job.salaryMin.toLocaleString()} ₽ за месяц`;
    } else {
      salaryText = "Зарплата не указана";
    }

    // Теги (опыт, выплаты и т.д.)
    let tags = "";
    if (job.experience === "noExperience") {
      tags += '<span class="vacancy-card-tag">Без опыта</span>';
    } else if (job.experience) {
      tags += `<span class="vacancy-card-tag">Опыт ${getExperienceText(
        job.experience
      )}</span>`;
    }
    if (job.conditions && Array.isArray(job.conditions)) {
      const payout = job.conditions.find((c) =>
        c.toLowerCase().includes("выплат")
      );
      if (payout) {
        tags += `<span class="vacancy-card-tag">${payout.replace(
          /^- /,
          ""
        )}</span>`;
      }
    }

    card.innerHTML = `
      <div class="vacancy-card-title-row">
        <span class="vacancy-card-title">${job.title}</span>
      </div>
      <div class="vacancy-card-salary-row" style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
        <span class="vacancy-card-salary">${salaryText}</span>
        ${tags}
      </div>
      <div class="vacancy-card-company-row">
        <span class="vacancy-card-company">${job.company}</span>
      </div>
      <div class="vacancy-card-address">${job.city}${
      job.description ? ", " + job.description : ""
    }</div>
    `;
    jobList.appendChild(card);
    setTimeout(() => card.classList.add("visible"), 100);
  });
  loadFavorites();
}

function updateResponsesList() {
  const responsesList = document.getElementById("responses-list");
  responsesList.querySelectorAll(".job-card").forEach((card) => card.remove());
  const respondedJobsList = jobs.filter((job) =>
    respondedJobs.includes(job.title)
  );
  respondedJobsList.forEach((job) => {
    const card = document.createElement("div");
    card.className = "job-card";
    card.setAttribute("data-title", job.title);
    card.setAttribute("data-company", job.company);
    card.setAttribute("data-description", job.fullDescription);
    card.setAttribute("data-city", job.city);
    card.setAttribute("data-salary-min", job.salaryMin);
    card.setAttribute("data-salary-max", job.salaryMax || "");
    card.setAttribute("data-experience", job.experience);
    card.setAttribute("data-employment", job.employment);
    card.setAttribute("data-schedule", job.schedule);
    card.setAttribute("data-hours", job.hours);
    card.setAttribute("data-internship", job.internship);
    card.setAttribute("data-work-format", job.workFormat);
    const experienceTag =
      job.experience === "noExperience"
        ? `<span class="tag">${getExperienceText(job.experience)}</span>`
        : `<span class="tag">Опыт: ${getExperienceText(job.experience)}</span>`;
    card.innerHTML = `
      <span class="favorite" onclick="toggleFavorite(this, '${
        job.title
      }')"><i class="fas fa-heart"></i></span>
      <h3>${job.title}</h3>
      <div class="salary-container">
        <div class="salary">${formatSalary(job.salaryMin, job.salaryMax)}</div>
        ${experienceTag}
        <span class="tag">${getWorkFormatText(job.workFormat)}</span>
      </div>
      <div class="company">${job.company}</div>
      <div class="address">${job.city}, ${job.description}</div>
      <button class="remove-btn" onclick="removeResponse('${
        job.title
      }')">Удалить</button>
    `;
    responsesList.appendChild(card);
    setTimeout(() => card.classList.add("visible"), 100);
  });
  loadFavorites();
}

function removeResponse(title) {
  respondedJobs = respondedJobs.filter((job) => job !== title);
  localStorage.setItem("respondedJobs", JSON.stringify(respondedJobs));
  updateResponsesList();
  document
    .querySelectorAll(`.respond-btn[onclick="respondToJob('${title}')"]`)
    .forEach((btn) => {
      btn.classList.remove("responded");
    });
  updateMarkerPopup(title);
  showNotification(`Отклик на вакансию "${title}" удалён`);
}

function loadFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  document.querySelectorAll(".job-card").forEach((card) => {
    const title = card.getAttribute("data-title");
    const favorite = card.querySelector(".favorite");
    favorite.classList.toggle("active", favorites.includes(title));
  });
}

function toggleFavorite(element, title) {
  element.classList.toggle("active");
  let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  if (element.classList.contains("active")) {
    if (!favorites.includes(title)) {
      favorites.push(title);
      showNotification(`Вакансия "${title}" добавлена в избранное`);
    }
  } else {
    favorites = favorites.filter((fav) => fav !== title);
    showNotification(`Вакансия "${title}" удалена из избранного`);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function showFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  const headerHeart = document.querySelector("#header-nav .fa-heart");
  const headerCheck = document.querySelector("#header-nav .fa-check");

  if (isShowingFavorites) {
    isShowingFavorites = false;
    headerHeart.classList.remove("active");
    showSection("main");
    updateJobList(jobs);
    updateMap(jobs);
    showNotification("Показаны все вакансии");
  } else {
    isShowingFavorites = true;
    isShowingResponses = false;
    headerHeart.classList.add("active");
    headerCheck.classList.remove("active");
    showSection("main");
    const filteredJobs = jobs.filter((job) => favorites.includes(job.title));
    updateJobList(filteredJobs);
    updateMap(filteredJobs);
    showNotification("Показаны избранные вакансии");
  }
}

function showResponses() {
  const headerHeart = document.querySelector("#header-nav .fa-heart");
  const headerCheck = document.querySelector("#header-nav .fa-check");
  if (isShowingResponses) {
    isShowingResponses = false;
    headerCheck.classList.remove("active");
    showSection("main");
    updateJobList(jobs);
    updateMap(jobs);
    if (map) {
      setTimeout(() => map.invalidateSize(), 300);
    }
    showNotification("Показаны все вакансии");
  } else {
    isShowingResponses = true;
    isShowingFavorites = false;
    headerCheck.classList.add("active");
    headerHeart.classList.remove("active");
    showSection("responses");
    updateResponsesList();
    showNotification("Показаны ваши отклики");
  }
}

function getMarkerIcon(job) {
  // Определяем иконку на основе типа работы
  let iconClass = "fa-briefcase"; // По умолчанию

  if (
    job.title.toLowerCase().includes("программист") ||
    job.title.toLowerCase().includes("разработчик") ||
    job.title.toLowerCase().includes("frontend") ||
    job.title.toLowerCase().includes("backend")
  ) {
    iconClass = "fa-code";
  } else if (
    job.title.toLowerCase().includes("дизайн") ||
    job.title.toLowerCase().includes("график")
  ) {
    iconClass = "fa-palette";
  } else if (
    job.title.toLowerCase().includes("менеджер") ||
    job.title.toLowerCase().includes("продаж")
  ) {
    iconClass = "fa-chart-line";
  } else if (
    job.title.toLowerCase().includes("повар") ||
    job.title.toLowerCase().includes("кухн")
  ) {
    iconClass = "fa-utensils";
  } else if (
    job.title.toLowerCase().includes("водитель") ||
    job.title.toLowerCase().includes("курьер")
  ) {
    iconClass = "fa-truck";
  } else if (
    job.title.toLowerCase().includes("официант") ||
    job.title.toLowerCase().includes("админ")
  ) {
    iconClass = "fa-user-tie";
  } else if (
    job.title.toLowerCase().includes("бухгалтер") ||
    job.title.toLowerCase().includes("финанс")
  ) {
    iconClass = "fa-calculator";
  } else if (
    job.title.toLowerCase().includes("маркетолог") ||
    job.title.toLowerCase().includes("реклам")
  ) {
    iconClass = "fa-bullhorn";
  }

  return `<i class="fas ${iconClass}"></i>`;
}

function updateMap(filteredJobs) {
  if (!map) return;
  markers.forEach((marker) => map.removeLayer(marker));
  markers = [];

  const jobCategories = {
    Программист: "marker-blue",
    Frontend: "marker-blue",
    Backend: "marker-blue",
    Разработчик: "marker-blue",
    Менеджер: "marker-green",
    Продажи: "marker-green",
    Флорист: "marker-teal",
    Дизайнер: "marker-purple",
    Графический: "marker-purple",
    Бухгалтер: "marker-orange",
    Финанс: "marker-orange",
    Маркетолог: "marker-pink",
    Реклама: "marker-pink",
    Официант: "marker-yellow",
    Повар: "marker-yellow",
    Кухня: "marker-yellow",
    "Системный администратор": "marker-red",
    IT: "marker-red",
    HR: "marker-teal",
    Курьер: "marker-green",
    Копирайтер: "marker-purple",
    Контент: "marker-purple",
  };

  const jobIcons = {
    Программист: "fa-code",
    Менеджер: "fa-briefcase",
    Флорист: "fa-leaf",
    Frontend: "fa-laptop-code",
    Дизайнер: "fa-palette",
    Бухгалтер: "fa-calculator",
    Маркетолог: "fa-bullhorn",
    Официант: "fa-utensils",
    "Системный администратор": "fa-server",
    HR: "fa-users",
    Курьер: "fa-truck",
    Копирайтер: "fa-pen-fancy",
    Повар: "fa-utensils",
  };

  filteredJobs.forEach((job) => {
    const salary = formatSalary(job.salaryMin, job.salaryMax);
    const respondedClass = respondedJobs.includes(job.title)
      ? " responded"
      : "";

    // Определяем иконку на основе названия должности
    let iconClass = "fa-map-marker-alt"; // дефолтная иконка
    for (const [key, value] of Object.entries(jobIcons)) {
      if (job.title.includes(key)) {
        iconClass = value;
        break;
      }
    }

    // Определяем цвет маркера на основе категории
    let colorClass = "marker-blue"; // дефолтный цвет
    for (const [key, value] of Object.entries(jobCategories)) {
      if (job.title.toLowerCase().includes(key.toLowerCase())) {
        colorClass = value;
        break;
      }
    }

    const popupContent = `
      <div class="map-popup">
        <b><a href="#" onclick="openJobModal('${job.title}', '${
      job.company
    }', '${salary}', '${job.fullDescription}', '${job.experience}', '${
      job.employment
    }', '${job.schedule}', '${job.hours}', '${job.internship}', '${
      job.workFormat
    }', '${job.conditions.join("|")}', '${job.responsibilities.join(
      "|"
    )}', '${job.requirements.join("|")}', '${job.keySkills.join(
      "|"
    )}'); return false;">${job.title}</a></b>
        <p><strong>Зарплата:</strong> ${salary}</p>
        <p>${job.company}</p>
        <p>${job.city}, ${job.description}</p>
        <button class="respond-btn${respondedClass}" onclick="respondToJob('${
      job.title
    }')">Откликнуться</button>
      </div>
    `;

    const markerIcon = L.divIcon({
      className: `custom-marker ${colorClass}`,
      html: `<i class="fas ${iconClass}"></i>`,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker([job.lat, job.lng], { icon: markerIcon })
      .addTo(map)
      .bindPopup(popupContent);
    marker.jobTitle = job.title;
    markers.push(marker);
  });
  map.invalidateSize();
}

function updateMarkerPopup(title) {
  const marker = markers.find((m) => m.jobTitle === title);
  if (marker) {
    const job = jobs.find((j) => j.title === title);
    if (job) {
      const salary = formatSalary(job.salaryMin, job.salaryMax);
      const respondedClass = respondedJobs.includes(job.title)
        ? " responded"
        : "";
      const popupContent = `
        <div class="map-popup">
          <b><a href="#" onclick="openJobModal('${job.title}', '${
        job.company
      }', '${salary}', '${job.fullDescription}', '${job.experience}', '${
        job.employment
      }', '${job.schedule}', '${job.hours}', '${job.internship}', '${
        job.workFormat
      }', '${job.conditions.join("|")}', '${job.responsibilities.join(
        "|"
      )}', '${job.requirements.join("|")}', '${job.keySkills.join(
        "|"
      )}'); return false;">${job.title}</a></b>
          <p><strong>Зарплата:</strong> ${salary}</p>
          <p>${job.company}</p>
          <p>${job.city}, ${job.description}</p>
          <button class="respond-btn${respondedClass}" onclick="respondToJob('${
        job.title
      }')">Откликнуться</button>
        </div>
      `;
      marker.setPopupContent(popupContent);
    }
  }
}

function searchJobs() {
  const searchInput = document.getElementById("search-input");
  const clearInput = document.getElementById("clear-input");
  // Показываем кнопку очистки, если есть текст
  if (searchInput.value.length > 0) {
    clearInput.classList.add("visible");
  } else {
    clearInput.classList.remove("visible");
  }
  // Здесь добавьте вашу логику поиска
  const type = document.querySelector(
    'input[name="search-type"]:checked'
  )?.value;
  console.log("Поиск:", searchInput.value, "Тип:", type);
}

function clearSearch() {
  const searchInput = document.getElementById("search-input");
  const clearInput = document.getElementById("clear-input");
  searchInput.value = "";
  clearInput.classList.remove("visible");
  searchJobs();
}

function sortJobs() {
  const sortValue = document.getElementById("sort-select").value;
  let sortedJobs = [...jobs];
  if (sortValue === "salary-desc") {
    sortedJobs.sort((a, b) => {
      const salaryA = parseInt(a.salaryMin);
      const salaryB = parseInt(b.salaryMin);
      if (salaryA === salaryB) {
        const maxA = a.salaryMax ? parseInt(a.salaryMax) : salaryA;
        const maxB = b.salaryMax ? parseInt(b.salaryMax) : salaryB;
        return maxB - maxA;
      }
      return salaryB - salaryA;
    });
  } else if (sortValue === "salary-asc") {
    sortedJobs.sort((a, b) => {
      const salaryA = parseInt(a.salaryMin);
      const salaryB = parseInt(b.salaryMin);
      if (salaryA === salaryB) {
        const maxA = a.salaryMax ? parseInt(a.salaryMax) : salaryA;
        const maxB = b.salaryMax ? parseInt(b.salaryMax) : salaryB;
        return maxA - maxB;
      }
      return salaryA - salaryB;
    });
  }
  isShowingFavorites = false;
  isShowingResponses = false;
  document.querySelector("#header-nav .fa-heart").classList.remove("active");
  document.querySelector("#header-nav .fa-check").classList.remove("active");
  updateJobList(sortedJobs);
  updateMap(sortedJobs);
}

function toggleList() {
  const listColumn = document.getElementById("job-list");
  const toggleBtn = document.getElementById("toggle-list-btn");
  const mapColumn = document.querySelector(".map-column");

  if (listColumn.classList.contains("hidden")) {
    listColumn.classList.remove("hidden");
    listColumn.classList.add("visible");
    mapColumn.style.flex = "0 0 600px";
    toggleBtn.textContent = "Скрыть список";
    setTimeout(() => {
      document.querySelectorAll(".job-card").forEach((card, index) => {
        setTimeout(() => card.classList.add("visible"), index * 100);
      });
    }, 300);
  } else {
    listColumn.classList.remove("visible");
    listColumn.classList.add("hidden");
    mapColumn.style.flex = "1";
    toggleBtn.textContent = "Показать список";
  }

  setTimeout(() => map && map.invalidateSize(), 300);
}

function openJobModal(
  title,
  company,
  salary,
  description,
  experience,
  employment,
  schedule,
  hours,
  internship,
  workFormat,
  conditions,
  responsibilities,
  requirements,
  keySkills
) {
  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-company").textContent = company;
  document.getElementById("modal-salary").textContent = salary;

  const descriptionElement = document.getElementById("modal-description");
  descriptionElement.innerHTML = `<h4>Описание</h4><p>${description}</p>`;

  const conditionsArray = Array.isArray(conditions)
    ? conditions
    : conditions.split("|");
  const conditionsElement = document.getElementById("modal-conditions");
  conditionsElement.innerHTML = `<h4>Условия</h4><ul>${conditionsArray
    .map((item) => `<li>${item}</li>`)
    .join("")}</ul>`;

  const responsibilitiesArray = Array.isArray(responsibilities)
    ? responsibilities
    : responsibilities.split("|");
  const responsibilitiesElement = document.getElementById(
    "modal-responsibilities"
  );
  responsibilitiesElement.innerHTML = `<h4>Обязанности</h4><ul>${responsibilitiesArray
    .map((item) => `<li>${item}</li>`)
    .join("")}</ul>`;

  const requirementsArray = Array.isArray(requirements)
    ? requirements
    : requirements.split("|");
  const requirementsElement = document.getElementById("modal-requirements");
  requirementsElement.innerHTML = `<h4>Требования</h4><ul>${requirementsArray
    .map((item) => `<li>${item}</li>`)
    .join("")}</ul>`;

  const keySkillsArray = Array.isArray(keySkills)
    ? keySkills
    : keySkills.split("|");
  const keySkillsElement = document.getElementById("modal-key-skills");
  keySkillsElement.innerHTML = `<h4>Ключевые навыки</h4><div class="key-skills">${keySkillsArray
    .map((skill) => `<span class="tag">${skill}</span>`)
    .join("")}</div>`;

  document.getElementById("modal-experience").textContent =
    getExperienceText(experience);
  document.getElementById("modal-employment").textContent =
    getEmploymentText(employment);
  document.getElementById("modal-schedule").textContent =
    getScheduleText(schedule);
  document.getElementById("modal-hours").textContent = hours + " ч";
  document.getElementById("modal-internship").textContent =
    internship === "yes" ? "Да" : "Нет";
  document.getElementById("modal-work-format").textContent =
    getWorkFormatText(workFormat);

  const modal = document.getElementById("job-modal");
  const modalContent = modal.querySelector(".modal-content");
  modal.style.display = "flex";
  setTimeout(() => modalContent.classList.add("active"), 10);
  document.getElementById("modal-respond-btn").onclick = () =>
    respondToJob(title);
  document
    .getElementById("modal-respond-btn")
    .classList.toggle("responded", respondedJobs.includes(title));

  // Инициализация карты в модальном окне
  if (modalMap) {
    modalMap.remove(); // Удаляем старую карту, если она существует
  }
  modalMap = L.map("modal-map", { zoomControl: false }).setView([0, 0], 12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(modalMap);

  // Находим координаты вакансии
  const job = jobs.find((j) => j.title === title);
  if (job && job.lat && job.lng) {
    modalMap.setView([job.lat, job.lng], 14);
    const marker = L.marker([job.lat, job.lng]).addTo(modalMap);
    const popupContent = `
      <div class="map-popup">
        <b>${job.title}</b>
        <p>${job.company}</p>
        <p>${job.city}, ${job.description}</p>
      </div>
    `;
    marker.bindPopup(popupContent).openPopup();
  }

  setTimeout(() => modalMap.invalidateSize(), 300); // Обновляем размер карты после рендеринга
}

function openFilterModal() {
  const modal = document.getElementById("filter-modal");
  const modalContent = modal.querySelector(".modal-content");
  modal.style.display = "flex";
  setTimeout(() => modalContent.classList.add("active"), 10);
  // Инициализация мультиселектов для модального фильтра
  if (typeof renderFilterScheduleMultiSelectInputModal === "function") {
    renderFilterScheduleMultiSelectInputModal();
  }
  if (typeof renderFilterHoursMultiSelectInputModal === "function") {
    renderFilterHoursMultiSelectInputModal();
  }
}

function applyFilters() {
  searchJobs();
  closeModal("filter-modal");
  showNotification("Фильтры применены");
}

function clearFilters() {
  document.getElementById("experience-filter").value = "";
  document.getElementById("employment-filter").value = "";
  document.getElementById("schedule-filter").value = "";
  document.getElementById("hours-filter").value = "";
  document.getElementById("work-format-filter").value = "";
  document.getElementById("salary-filter").value = "";
  document.getElementById("internship-filter").checked = false;
  searchJobs();
  showNotification("Фильтры очищены");
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  const modalContent = modal.querySelector(".modal-content");
  modalContent.classList.remove("active");
  if (modalId === "job-modal" && modalMap) {
    modalMap.remove();
    modalMap = null;
  }
  if (modalId === "map-select-modal" && mapSelect) {
    mapSelect.remove();
    mapSelect = null;
  }
  setTimeout(() => (modal.style.display = "none"), 300);
}

function trackOnMap(lat, lng, title) {
  if (!map) return;
  map.setView([lat, lng], 14);
  const marker = markers.find((m) => m.jobTitle === title);
  if (marker) marker.openPopup();
}

function respondToJob(title) {
  const marker = markers.find((m) => m.jobTitle === title);
  const wasPopupOpen =
    marker && marker.getPopup() && marker.getPopup().isOpen();

  if (!respondedJobs.includes(title)) {
    respondedJobs.push(title);
    localStorage.setItem("respondedJobs", JSON.stringify(respondedJobs));
    document
      .querySelectorAll(`.respond-btn[onclick="respondToJob('${title}')"]`)
      .forEach((btn) => {
        btn.classList.add("responded");
      });
    const modalRespondBtn = document.getElementById("modal-respond-btn");
    if (modalRespondBtn) {
      modalRespondBtn.classList.add("responded"); // Немедленно обновляем кнопку в модальном окне
    }
    updateMarkerPopup(title);
    showNotification(`Вы откликнулись на вакансию: ${title}`);
  } else {
    showNotification(`Вы уже откликнулись на вакансию: ${title}`);
  }

  if (wasPopupOpen && marker) {
    marker.openPopup();
  }
  if (isShowingResponses) {
    updateResponsesList();
  }
}

function getExperienceText(value) {
  return (
    {
      noExperience: "Без опыта",
      "1-3": "1–3 года",
      "3-6": "3–6 лет",
    }[value] || value
  );
}

function getEmploymentText(value) {
  return (
    {
      full: "Полная",
      part: "Частичная",
      remote: "Удалённая",
    }[value] || value
  );
}

function getScheduleText(value) {
  return (
    {
      "5/2": "5/2",
      "2/2": "2/2",
      flex: "Гибкий",
    }[value] || value
  );
}

function getWorkFormatText(value) {
  return (
    {
      office: "Офис",
      remote: "Удалённо",
      hybrid: "Гибрид",
    }[value] || value
  );
}

function goToMainPage() {
  showSection("main");
}

// Инициализация VK SDK
function initVK() {
  return new Promise((resolve, reject) => {
    if (window.VK) {
      VK.init({
        apiId: "53528960",
        onlyWidgets: false,
      });
      resolve();
    } else {
      // Если VK еще не загружен, ждем его загрузки
      window.addEventListener("vk_loaded", () => {
        VK.init({
          apiId: "53528960",
          onlyWidgets: false,
        });
        resolve();
      });

      // Таймаут на случай, если VK не загрузится
      setTimeout(() => {
        reject(new Error("VK SDK не загружен"));
      }, 10000);
    }
  });
}

// Функция для входа через ВКонтакте
async function handleVkLogin() {
  try {
    await initVK();

    VK.Auth.login(
      function (response) {
        if (response.session) {
          const user = response.session.user;
          const email = user.email || `${user.id}@vk.com`; // ВКонтакте не всегда возвращает email
          const name = `${user.first_name} ${user.last_name}`;
          const users = JSON.parse(localStorage.getItem("users") || "{}");

          if (!users[email]) {
            // Если пользователь не существует, создаем нового
            users[email] = { name, password: null, role: selectedRole };
            localStorage.setItem("users", JSON.stringify(users));
          }

          localStorage.setItem(
            "currentUser",
            JSON.stringify({ email, name, role: selectedRole })
          );
          showSection("main");
          updateHeader();
          showNotification("Вход через ВКонтакте успешен");
        } else {
          showNotification(
            "Ошибка входа через ВКонтакте: не удалось получить данные пользователя"
          );
        }
      },
      VK.access.EMAIL // Запрашиваем доступ к email (если доступно)
    );
  } catch (error) {
    console.error("Ошибка при инициализации VK:", error);
    showNotification("Ошибка входа через ВКонтакте: " + error.message);
  }
}

function handleVkRegister() {
  // Регистрация через ВКонтакте аналогична входу
  handleVkLogin();
}

function toggleCityDropdown() {
  const dropdown = document.getElementById("city-dropdown");
  const button = document.querySelector(".city-select-btn");
  const isActive = dropdown.classList.contains("active");

  if (!isActive) {
    dropdown.classList.add("active");
    button.classList.add("active");
    document.addEventListener("click", closeCityDropdown);

    // Focus the search input when opening
    setTimeout(() => {
      document.getElementById("city-search-input").focus();
    }, 100);
  } else {
    dropdown.classList.remove("active");
    button.classList.remove("active");
    document.removeEventListener("click", closeCityDropdown);
  }
}

function closeCityDropdown(event) {
  const dropdown = document.getElementById("city-dropdown");
  const citySelect = document.querySelector(".city-select-container");
  const button = document.querySelector(".city-select-btn");

  if (!citySelect.contains(event.target)) {
    dropdown.classList.remove("active");
    button.classList.remove("active");
    document.removeEventListener("click", closeCityDropdown);
  }
}

function filterCities() {
  const searchInput = document.getElementById("city-search-input");
  const clearButton = document.getElementById("clear-city-search");
  const searchText = searchInput.value.toLowerCase();
  const cityItems = document.querySelectorAll(".city-item");
  let hasVisibleItems = false;

  // Показываем/скрываем кнопку очистки
  clearButton.classList.toggle("visible", searchText.length > 0);

  cityItems.forEach((item) => {
    const cityName = item.textContent.toLowerCase();
    const isVisible = cityName.includes(searchText);
    item.style.display = isVisible ? "flex" : "none";
    if (isVisible) hasVisibleItems = true;
  });

  // Показываем сообщение, если ничего не найдено
  const noResults = document.querySelector(".no-results");
  if (!hasVisibleItems && searchText.length > 0) {
    if (!noResults) {
      const message = document.createElement("div");
      message.className = "no-results";
      message.innerHTML = '<i class="fas fa-search"></i> Город не найден';
      document.querySelector(".city-list").appendChild(message);
    }
  } else if (noResults) {
    noResults.remove();
  }
}

function clearCitySearch() {
  const searchInput = document.getElementById("city-search-input");
  const clearButton = document.getElementById("clear-city-search");

  searchInput.value = "";
  clearButton.classList.remove("visible");
  filterCities();
  searchInput.focus();
}

function selectCity(city) {
  const selectedCity = document.getElementById("selected-city");
  const dropdown = document.getElementById("city-dropdown");
  const button = document.querySelector(".city-select-btn");

  // Анимация выбора города
  selectedCity.style.opacity = "0";
  setTimeout(() => {
    selectedCity.textContent = city;
    selectedCity.style.opacity = "1";
  }, 150);

  dropdown.classList.remove("active");
  button.classList.remove("active");
  document.removeEventListener("click", closeCityDropdown);

  // Обновляем список вакансий в соответствии с выбранным городом
  const filteredJobs =
    city === "Вся ЧР" ? jobs : jobs.filter((job) => job.city === city);

  updateJobList(filteredJobs);
  updateMap(filteredJobs);

  // Центрируем карту на выбранном городе
  if (city !== "Вся ЧР") {
    const cityCoordinates = {
      Грозный: [43.3177, 45.6949],
      Аргун: [43.2917, 45.8722],
      Гудермес: [43.3507, 46.1033],
      "Урус-Мартан": [43.1303, 45.5389],
      Шали: [43.1481, 45.9019],
    };

    if (cityCoordinates[city]) {
      map.setView(cityCoordinates[city], 13);
    }
  } else {
    // Если выбрана вся ЧР, показываем всю республику
    map.setView([43.3177, 45.6949], 9);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var authBtn = document.getElementById("auth-link");
  if (authBtn) {
    authBtn.onclick = function (e) {
      e.preventDefault();
      window.location.href = "auth.html";
    };
  }
  var logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.onclick = function () {
      handleLogout();
    };
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  if (!currentUser.email) {
    window.location.href = "auth.html";
  }
});

// --- SEARCH DROPDOWN LOGIC ---
document.addEventListener("DOMContentLoaded", function () {
  const dropdown = document.querySelector(".search-dropdown");
  const dropdownToggle = dropdown?.querySelector(".dropdown-toggle");
  const dropdownMenu = dropdown?.querySelector(".dropdown-menu");
  const options = dropdownMenu?.querySelectorAll(".dropdown-option");
  const selectedSpan = dropdownToggle?.querySelector("#dropdown-selected");
  const radios = dropdownMenu?.querySelectorAll('input[type="radio"]');

  // Открытие/закрытие меню
  if (dropdownToggle && dropdown) {
    dropdownToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      dropdown.classList.toggle("open");
    });
    document.addEventListener("click", function (e) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
      }
    });
  }

  // Выбор опции
  if (options && selectedSpan && radios) {
    options.forEach((option) => {
      option.addEventListener("click", function (e) {
        const radio = option.querySelector('input[type="radio"]');
        if (radio && !radio.checked) {
          radio.checked = true;
          radios.forEach((r) =>
            r.closest(".dropdown-option").classList.remove("active")
          );
          option.classList.add("active");
          selectedSpan.textContent = radio.value;
          dropdown.classList.remove("open");
        }
      });
    });
    // При загрузке — выставить активную
    radios.forEach((radio) => {
      if (radio.checked) {
        radio.closest(".dropdown-option").classList.add("active");
        selectedSpan.textContent = radio.value;
      }
    });
  }
});

// Открыть модальное окно вакансии по id
function openJobModalById(jobId) {
  const jobs = getAllJobs();
  const job = jobs.find((j) => String(j.id) === String(jobId));
  if (!job) return;

  // Заполняем модальное окно
  document.getElementById("modal-title").textContent = job.title || "";
  document.getElementById("modal-company").textContent =
    job.specialization || "";
  document.getElementById("modal-salary").textContent = job.salary
    ? `${job.salary.from} - ${job.salary.to} ${job.salary.currency} ${job.salary.period}`
    : "";
  document.getElementById("modal-description").innerHTML =
    job.description || "";
  // Можно добавить другие поля по аналогии

  // Открываем модалку
  document.getElementById("job-modal").style.display = "flex";
  setTimeout(() => {
    document.querySelector("#job-modal .modal-content").classList.add("active");
  }, 10);
}

// Делегирование клика по .view-job-btn (работает для карты и списка)
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("view-job-btn")) {
    e.preventDefault();
    const url = e.target.getAttribute("href");
    const match = url.match(/id=(\d+)/);
    if (match) {
      openJobModalById(match[1]);
    }
  }
});

// Закрытие модального окна по крестику
window.closeModal = function (modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.style.display = "none";
  const content = modal.querySelector(".modal-content");
  if (content) content.classList.remove("active");
};

// --- МУЛЬТИСЕЛЕКТЫ ДЛЯ ФИЛЬТРА ---
const filterScheduleOptions = [
  "6/1",
  "5/2",
  "4/4",
  "4/3",
  "4/2",
  "2/2",
  "2/1",
  "1/3",
  "По выходным",
  "Свободный",
  "Другое",
];
let filterSelectedSchedules = [];
const filterScheduleMultiSelect = document.getElementById(
  "filter-schedule-multiselect"
);
const filterScheduleMultiSelectInput = document.getElementById(
  "filter-schedule-multiselect-input"
);
const filterScheduleMultiSelectDropdown = document.getElementById(
  "filter-schedule-multiselect-dropdown"
);
const filterScheduleMultiSelectArrow = document.getElementById(
  "filter-schedule-multiselect-arrow"
);

function renderFilterScheduleMultiSelectInput() {
  filterScheduleMultiSelectInput.innerHTML = "";
  filterSelectedSchedules.forEach((val) => {
    const tag = document.createElement("span");
    tag.className = "multi-select-tag";
    tag.textContent = val;
    const close = document.createElement("span");
    close.className = "multi-select-tag-close";
    close.innerHTML = "&times;";
    close.onclick = function (e) {
      e.stopPropagation();
      filterSelectedSchedules = filterSelectedSchedules.filter(
        (v) => v !== val
      );
      renderFilterScheduleMultiSelectInput();
      renderFilterScheduleMultiSelectDropdown();
    };
    tag.appendChild(close);
    filterScheduleMultiSelectInput.appendChild(tag);
  });
  if (filterSelectedSchedules.length === 0) {
    const placeholder = document.createElement("span");
    placeholder.className = "multi-select-placeholder";
    placeholder.textContent = "Выберите из списка";
    filterScheduleMultiSelectInput.appendChild(placeholder);
  }
}

function renderFilterScheduleMultiSelectDropdown() {
  filterScheduleMultiSelectDropdown.innerHTML = "";
  filterScheduleOptions.forEach((opt) => {
    const row = document.createElement("div");
    row.className =
      "multi-select-option" +
      (filterSelectedSchedules.includes(opt) ? " selected" : "");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = filterSelectedSchedules.includes(opt);
    checkbox.onchange = function (e) {
      if (this.checked) {
        if (!filterSelectedSchedules.includes(opt))
          filterSelectedSchedules.push(opt);
      } else {
        filterSelectedSchedules = filterSelectedSchedules.filter(
          (v) => v !== opt
        );
      }
      renderFilterScheduleMultiSelectInput();
      renderFilterScheduleMultiSelectDropdown();
    };
    const label = document.createElement("label");
    label.textContent = opt;
    row.appendChild(checkbox);
    row.appendChild(label);
    filterScheduleMultiSelectDropdown.appendChild(row);
  });
}

function openFilterScheduleMultiSelectDropdown() {
  filterScheduleMultiSelectDropdown.style.display = "block";
  renderFilterScheduleMultiSelectDropdown();
  filterScheduleMultiSelect.classList.add("active");
}
function closeFilterScheduleMultiSelectDropdown() {
  filterScheduleMultiSelectDropdown.style.display = "none";
  filterScheduleMultiSelect.classList.remove("active");
}

filterScheduleMultiSelectInput.addEventListener(
  "click",
  openFilterScheduleMultiSelectDropdown
);
filterScheduleMultiSelectInput.addEventListener(
  "focus",
  openFilterScheduleMultiSelectDropdown
);
filterScheduleMultiSelectArrow.addEventListener("click", function (e) {
  e.stopPropagation();
  if (filterScheduleMultiSelectDropdown.style.display === "block") {
    closeFilterScheduleMultiSelectDropdown();
  } else {
    openFilterScheduleMultiSelectDropdown();
  }
});
document.addEventListener("click", function (e) {
  if (!filterScheduleMultiSelect.contains(e.target)) {
    closeFilterScheduleMultiSelectDropdown();
  }
});
renderFilterScheduleMultiSelectInput();

// --- МУЛЬТИСЕЛЕКТ ДЛЯ РАБОЧИХ ЧАСОВ В ДЕНЬ (ФИЛЬТР) ---
const filterHoursOptions = [
  "4",
  "6",
  "8",
  "10",
  "12",
  "По договорённости",
  "Другое",
];
let filterSelectedHours = [];
const filterHoursMultiSelect = document.getElementById(
  "filter-hours-multiselect"
);
const filterHoursMultiSelectInput = document.getElementById(
  "filter-hours-multiselect-input"
);
const filterHoursMultiSelectDropdown = document.getElementById(
  "filter-hours-multiselect-dropdown"
);
const filterHoursMultiSelectArrow = document.getElementById(
  "filter-hours-multiselect-arrow"
);

function renderFilterHoursMultiSelectInput() {
  filterHoursMultiSelectInput.innerHTML = "";
  filterSelectedHours.forEach((val) => {
    const tag = document.createElement("span");
    tag.className = "multi-select-tag";
    tag.textContent = val;
    const close = document.createElement("span");
    close.className = "multi-select-tag-close";
    close.innerHTML = "&times;";
    close.onclick = function (e) {
      e.stopPropagation();
      filterSelectedHours = filterSelectedHours.filter((v) => v !== val);
      renderFilterHoursMultiSelectInput();
      renderFilterHoursMultiSelectDropdown();
    };
    tag.appendChild(close);
    filterHoursMultiSelectInput.appendChild(tag);
  });
  if (filterSelectedHours.length === 0) {
    const placeholder = document.createElement("span");
    placeholder.className = "multi-select-placeholder";
    placeholder.textContent = "Выберите из списка";
    filterHoursMultiSelectInput.appendChild(placeholder);
  }
}

function renderFilterHoursMultiSelectDropdown() {
  filterHoursMultiSelectDropdown.innerHTML = "";
  filterHoursOptions.forEach((opt) => {
    const row = document.createElement("div");
    row.className =
      "multi-select-option" +
      (filterSelectedHours.includes(opt) ? " selected" : "");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = filterSelectedHours.includes(opt);
    checkbox.onchange = function (e) {
      if (this.checked) {
        if (!filterSelectedHours.includes(opt)) filterSelectedHours.push(opt);
      } else {
        filterSelectedHours = filterSelectedHours.filter((v) => v !== opt);
      }
      renderFilterHoursMultiSelectInput();
      renderFilterHoursMultiSelectDropdown();
    };
    const label = document.createElement("label");
    label.textContent = opt;
    row.appendChild(checkbox);
    row.appendChild(label);
    filterHoursMultiSelectDropdown.appendChild(row);
  });
}

function openFilterHoursMultiSelectDropdown() {
  filterHoursMultiSelectDropdown.style.display = "block";
  renderFilterHoursMultiSelectDropdown();
  filterHoursMultiSelect.classList.add("active");
}
function closeFilterHoursMultiSelectDropdown() {
  filterHoursMultiSelectDropdown.style.display = "none";
  filterHoursMultiSelect.classList.remove("active");
}

filterHoursMultiSelectInput.addEventListener(
  "click",
  openFilterHoursMultiSelectDropdown
);
filterHoursMultiSelectInput.addEventListener(
  "focus",
  openFilterHoursMultiSelectDropdown
);
filterHoursMultiSelectArrow.addEventListener("click", function (e) {
  e.stopPropagation();
  if (filterHoursMultiSelectDropdown.style.display === "block") {
    closeFilterHoursMultiSelectDropdown();
  } else {
    openFilterHoursMultiSelectDropdown();
  }
});
document.addEventListener("click", function (e) {
  if (!filterHoursMultiSelect.contains(e.target)) {
    closeFilterHoursMultiSelectDropdown();
  }
});
renderFilterHoursMultiSelectInput();

// --- DROPDOWN ДЛЯ ВЫБОРА ВАЛЮТЫ В ФИЛЬТРЕ ---
const currencyDropdown = document.querySelector(".currency-dropdown");
const currencySelected = document.getElementById("currency-selected");
const currencySymbol = document.getElementById("currency-symbol");
const currencyList = document.getElementById("currency-list");

if (currencyDropdown && currencySelected && currencyList && currencySymbol) {
  currencySelected.addEventListener("click", function (e) {
    e.stopPropagation();
    const isOpen = currencyList.style.display === "block";
    currencyList.style.display = isOpen ? "none" : "block";
  });
  currencyList.querySelectorAll(".dropdown-option").forEach((option) => {
    option.addEventListener("click", function (e) {
      e.stopPropagation();
      const value = this.getAttribute("data-currency");
      currencySymbol.textContent = value;
      currencyList.style.display = "none";
    });
  });
  document.addEventListener("click", function (e) {
    if (!currencyDropdown.contains(e.target)) {
      currencyList.style.display = "none";
    }
  });
}

// --- Форматирование поля 'Своя зарплата' с пробелами ---
const salaryOwnInput = document.getElementById("salary-own-input");
if (salaryOwnInput) {
  salaryOwnInput.addEventListener("input", function (e) {
    let value = salaryOwnInput.value.replace(/\D/g, "");
    if (value) {
      salaryOwnInput.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    } else {
      salaryOwnInput.value = "";
    }
  });
}

// --- Динамическая смена валюты и значений зарплаты в фильтре ---
const salaryRadioContainer = document.querySelectorAll(
  'input[type="radio"][name="salary"]'
);
const salaryRadioLabels = Array.from(
  document.querySelectorAll('input[type="radio"][name="salary"]').values()
).map((r) => r.parentElement);
const salaryOwnInputField = document.getElementById("salary-own-input");
const salaryOwnRadio = document.getElementById("salary-own-radio");
const currencySymbolSpan = document.getElementById("currency-symbol");

function updateSalaryRadiosByCurrency(currency) {
  // Массивы значений для разных валют
  let values, symbol;
  if (currency === "$" || currency === "€") {
    values = [300, 500, 700, 900, 1000];
    symbol = currency;
  } else {
    values = [30000, 50000, 70000, 90000, 100000];
    symbol = "₽";
  }
  // Находим все radio и их label
  const radios = document.querySelectorAll(
    'input[type="radio"][name="salary"]'
  );
  const labels = Array.from(radios).map((r) => r.parentElement);
  let idx = 0;
  for (let i = 0; i < labels.length; i++) {
    const label = labels[i];
    if (
      label.textContent.includes("Не имеет значения") ||
      label.textContent.includes("Своя зарплата")
    )
      continue;
    if (idx < values.length) {
      label.childNodes[1].checked = false;
      label.childNodes[1].value = `from_${values[idx]}_${symbol}`;
      label.childNodes[1].nextSibling &&
        (label.childNodes[1].nextSibling.textContent = ` от ${values[
          idx
        ].toLocaleString()} ${symbol}`);
      label.childNodes[1].parentElement.childNodes[2].textContent = ` от ${values[
        idx
      ].toLocaleString()} ${symbol}`;
      idx++;
    } else {
      label.style.display = "none";
    }
  }
  // Обновляем плейсхолдер и значок в поле "Своя зарплата"
  if (salaryOwnInputField) {
    salaryOwnInputField.placeholder = `от`;
  }
}

if (currencySymbolSpan) {
  const observer = new MutationObserver(function () {
    updateSalaryRadiosByCurrency(currencySymbolSpan.textContent);
  });
  observer.observe(currencySymbolSpan, { childList: true });
}
// При первой загрузке выставить значения
if (currencySymbolSpan) {
  updateSalaryRadiosByCurrency(currencySymbolSpan.textContent);
}

// Header scroll effect
window.addEventListener("scroll", function () {
  const header = document.querySelector(".cursor-header");
  if (window.scrollY > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Auth link click handler
document.getElementById("auth-link").onclick = function () {
  window.location.href = "auth.html";
};

// Update header text based on user role
(function () {
  var isSeeker = localStorage.getItem("isSeeker") === "true";
  var isEmployer = localStorage.getItem("isEmployer") === "true";
  if (isSeeker) {
    var navLink = document.querySelector("a[href='vacancies.html']");
    if (navLink) {
      navLink.textContent = "Отклики";
    }
    var vacancyBtn = document.querySelector(".vacancy-btn span");
    if (vacancyBtn) {
      vacancyBtn.textContent = "Создать резюме";
    }
  } else if (isEmployer) {
    // (если пользователь – работодатель, то текст в шапке не меняется, например, "Вакансии" и "Создать вакансию")
  }
})();

// Custom salary input styling
const filterSalaryOwnRadio = document.getElementById("salary-own-radio");
const filterSalaryOwnInput = document.getElementById("salary-own-input");
const filterSalaryRadios = document.querySelectorAll(
  "input[type=radio][name=salary]"
);
if (filterSalaryOwnRadio && filterSalaryOwnInput) {
  filterSalaryRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (filterSalaryOwnRadio.checked) {
        filterSalaryOwnInput.style.background = "#ffffff";
        filterSalaryOwnInput.style.borderColor = "#2563eb";
      } else {
        filterSalaryOwnInput.style.background = "#f5f7fa";
        filterSalaryOwnInput.style.borderColor = "#e0e0e0";
      }
    });
  });
}

// Toggle between list and map views
function toggleMapView() {
  const mapBtnWrapper = document.getElementById("map-btn-wrapper");
  const mapBtnMapControls = document.getElementById("map-btn-map-controls");
  const mapBtn = document.querySelector(".vacancy-map-btn");
  const filterSortRow = document.querySelector(".filter-sort-row");
  const vacancyList = document.getElementById("vacancy-list");
  const vacancyMap = document.getElementById("vacancy-map");
  const mainFilter = document.querySelector(".main-filter");
  const pagination = document.getElementById("pagination");

  if (vacancyList.style.display !== "none") {
    // Switch to map view
    vacancyList.style.display = "none";
    mainFilter.style.display = "none";
    vacancyMap.style.display = "block";
    if (mapBtn && mapBtnMapControls) mapBtnMapControls.appendChild(mapBtn);
    if (filterSortRow) filterSortRow.style.display = "none";
    mapBtn.textContent = "Списком";
    if (pagination) pagination.style.display = "none";

    // Initialize map if not already initialized
    if (!map) {
      map = L.map("vacancy-map").setView([43.3177, 45.6949], 9);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
    }
    // Update map with current jobs
    updateMap(jobs);
  } else {
    // Switch to list view
    vacancyList.style.display = "flex";
    mainFilter.style.display = "block";
    vacancyMap.style.display = "none";
    if (mapBtn && mapBtnWrapper) mapBtnWrapper.appendChild(mapBtn);
    if (filterSortRow) filterSortRow.style.display = "";
    mapBtn.textContent = "На карте";
    if (pagination) pagination.style.display = "";
  }
}

// Add event listener for the map toggle button
document.addEventListener("DOMContentLoaded", function () {
  const mapBtn = document.querySelector(".vacancy-map-btn");
  if (mapBtn) {
    mapBtn.addEventListener("click", toggleMapView);
  }
});

function toggleMapSidebar() {
  const mapControls = document.querySelector(".map-controls");
  const mapSidebar = document.querySelector(".map-sidebar");

  mapControls.classList.toggle("sidebar-open");
  mapSidebar.classList.toggle("open");
  if (mapSidebar.classList.contains("open")) {
    renderMapSidebarJobs();
  }
}

function renderMapSidebarJobs(
  jobsToRender = filteredJobs.length ? filteredJobs : jobs
) {
  const sidebarList = document.getElementById("map-vacancy-list");
  if (!sidebarList) return;

  sidebarList.innerHTML = "";
  jobsToRender.forEach((job) => {
    const card = document.createElement("div");
    card.className = "vacancy-card";
    // Форматируем зарплату
    let salaryText = "";
    if (job.salaryMin && job.salaryMax) {
      salaryText = `${job.salaryMin.toLocaleString()} – ${job.salaryMax.toLocaleString()} ₽ за месяц`;
    } else if (job.salaryMin) {
      salaryText = `от ${job.salaryMin.toLocaleString()} ₽ за месяц`;
    } else {
      salaryText = "Зарплата не указана";
    }
    // Теги (опыт, выплаты и т.д.)
    let tags = "";
    if (job.experience === "noExperience") {
      tags += '<span class="vacancy-card-tag">Без опыта</span>';
    } else if (job.experience) {
      tags += `<span class="vacancy-card-tag">Опыт ${getExperienceText(
        job.experience
      )}</span>`;
    }
    if (job.conditions && Array.isArray(job.conditions)) {
      const payout = job.conditions.find((c) =>
        c.toLowerCase().includes("выплат")
      );
      if (payout) {
        tags += `<span class="vacancy-card-tag">${payout.replace(
          /^- /,
          ""
        )}</span>`;
      }
    }
    card.innerHTML = `
      <div class="vacancy-card-title-row">
        <span class="vacancy-card-title">${job.title}</span>
      </div>
      <div class="vacancy-card-salary-row" style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
        <span class="vacancy-card-salary">${salaryText}</span>
        ${tags}
      </div>
      <div class="vacancy-card-company-row">
        <span class="vacancy-card-company">${job.company}</span>
      </div>
      <div class="vacancy-card-address">${job.city}${
      job.description ? ", " + job.description : ""
    }</div>
    `;
    sidebarList.appendChild(card);
    setTimeout(() => card.classList.add("visible"), 100);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const filterBtn = document.querySelector(".map-filter-btn");
  const listBtn = document.querySelector(".map-list-btn");
  const mapSidebar = document.querySelector(".map-sidebar");

  if (filterBtn) {
    filterBtn.addEventListener("click", function () {
      filterBtn.classList.toggle("active");
      // Если открыто окно фильтра, убираем рамку при закрытии
      const filterModal = document.getElementById("filter-modal");
      if (filterModal) {
        filterModal.addEventListener("transitionend", function () {
          if (filterModal.style.display === "none") {
            filterBtn.classList.remove("active");
          }
        });
      }
    });
  }

  if (listBtn) {
    listBtn.addEventListener("click", function () {
      listBtn.classList.toggle("active");
      // Если боковое окно закрывается, убираем рамку
      if (!mapSidebar.classList.contains("open")) {
        listBtn.classList.remove("active");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // ... существующий код ...

  const sidebarCloseBtn = document.querySelector(".map-sidebar-close");
  const mapSidebar = document.querySelector(".map-sidebar");
  const mapControls = document.querySelector(".map-controls");
  if (sidebarCloseBtn && mapSidebar && mapControls) {
    sidebarCloseBtn.addEventListener("click", function () {
      mapSidebar.classList.remove("open");
      mapControls.classList.remove("sidebar-open");
      const listBtn = document.querySelector(".map-list-btn");
      if (listBtn) listBtn.classList.remove("active");
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // ... существующий код ...

  const mapSidebar = document.querySelector(".map-sidebar");
  if (mapSidebar && window.map) {
    // Prevent map zoom when scrolling inside sidebar
    mapSidebar.addEventListener(
      "wheel",
      function (e) {
        e.stopPropagation();
      },
      { passive: false }
    );

    // Prevent map zoom when mouse is over sidebar
    mapSidebar.addEventListener("mouseenter", function () {
      if (map && map.scrollWheelZoom) {
        map.scrollWheelZoom.disable();
      }
    });

    mapSidebar.addEventListener("mouseleave", function () {
      if (map && map.scrollWheelZoom) {
        map.scrollWheelZoom.enable();
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // ... existing code ...

  // --- Логика выпадающих списков сортировки и периода в map-sidebar ---
  const sidebarSortDropdown = document.querySelector(
    ".map-sidebar .sort-dropdown"
  );
  const sidebarSortToggle = document.querySelector(
    ".map-sidebar #sidebar-sort-toggle"
  );
  const sidebarSortMenu = document.querySelector(
    ".map-sidebar #sidebar-sort-menu"
  );
  const sidebarSortSelected = document.querySelector(
    ".map-sidebar #sidebar-sort-selected"
  );
  const sidebarSortOptions = sidebarSortMenu
    ? sidebarSortMenu.querySelectorAll(".sidebar-dropdown-option")
    : [];

  const sidebarPeriodDropdown = document.querySelector(
    ".map-sidebar .period-dropdown"
  );
  const sidebarPeriodToggle = document.querySelector(
    ".map-sidebar #sidebar-period-toggle"
  );
  const sidebarPeriodMenu = document.querySelector(
    ".map-sidebar #sidebar-period-menu"
  );
  const sidebarPeriodSelected = document.querySelector(
    ".map-sidebar #sidebar-period-selected"
  );
  const sidebarPeriodOptions = sidebarPeriodMenu
    ? sidebarPeriodMenu.querySelectorAll(".sidebar-dropdown-option")
    : [];

  // Открытие/закрытие меню сортировки
  sidebarSortToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    sidebarSortDropdown.classList.toggle("open");
    sidebarPeriodDropdown.classList.remove("open");
  });
  // Открытие/закрытие меню периода
  sidebarPeriodToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    sidebarPeriodDropdown.classList.toggle("open");
    sidebarSortDropdown.classList.remove("open");
  });
  // Закрытие всех dropdown при клике вне
  document.addEventListener("click", function () {
    sidebarSortDropdown.classList.remove("open");
    sidebarPeriodDropdown.classList.remove("open");
  });

  // Выбор сортировки
  sidebarSortOptions.forEach((option) => {
    option.addEventListener("click", function (e) {
      e.stopPropagation();
      sidebarSortOptions.forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");
      sidebarSortSelected.textContent = this.textContent;
      sidebarSortDropdown.classList.remove("open");
      applySidebarSortAndPeriod();
    });
  });
  // Выбор периода
  sidebarPeriodOptions.forEach((option) => {
    option.addEventListener("click", function (e) {
      e.stopPropagation();
      sidebarPeriodOptions.forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");
      sidebarPeriodSelected.textContent = this.textContent;
      sidebarPeriodDropdown.classList.remove("open");
      applySidebarSortAndPeriod();
    });
  });

  // Основная функция применения сортировки и периода
  function applySidebarSortAndPeriod() {
    let sortType = sidebarSortMenu
      .querySelector(".sidebar-dropdown-option.active")
      .getAttribute("data-sort");
    let periodType = sidebarPeriodMenu
      .querySelector(".sidebar-dropdown-option.active")
      .getAttribute("data-period");
    let filtered = [...jobs];
    // Фильтрация по периоду (заглушка, если появится поле date - реализовать)
    if (periodType !== "all") {
      // Здесь можно реализовать фильтрацию по дате публикации
      // Например, filtered = filtered.filter(job => ...)
    }
    // Сортировка
    if (sortType === "relevance") {
      // По соответствию (оставим как есть)
    } else if (sortType === "date") {
      filtered.sort((a, b) => (b.date || 0) - (a.date || 0));
    } else if (sortType === "salary-desc") {
      filtered.sort((a, b) => {
        // Сначала вакансии с зарплатой, потом без
        const aSalary = a.salaryMax || a.salaryMin || 0;
        const bSalary = b.salaryMax || b.salaryMin || 0;
        if (!bSalary && aSalary) return -1;
        if (!aSalary && bSalary) return 1;
        return bSalary - aSalary;
      });
    } else if (sortType === "salary-asc") {
      filtered.sort((a, b) => {
        const aSalary = a.salaryMin || a.salaryMax || 0;
        const bSalary = b.salaryMin || b.salaryMax || 0;
        if (!aSalary && bSalary) return 1;
        if (!bSalary && aSalary) return -1;
        return aSalary - bSalary;
      });
    }
    renderMapSidebarJobs(filtered);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // --- Логика выпадающих списков сортировки и периода на главной странице ---
  const mainSortDropdown = document.querySelector(
    ".filter-sort-row .sort-dropdown"
  );
  const mainSortToggle = document.getElementById("main-sort-toggle");
  const mainSortMenu = document.getElementById("main-sort-menu");
  const mainSortSelected = document.getElementById("main-sort-selected");
  const mainSortOptions = mainSortMenu
    ? mainSortMenu.querySelectorAll(".sidebar-dropdown-option")
    : [];

  const mainPeriodDropdown = document.querySelector(
    ".filter-sort-row .period-dropdown"
  );
  const mainPeriodToggle = document.getElementById("main-period-toggle");
  const mainPeriodMenu = document.getElementById("main-period-menu");
  const mainPeriodSelected = document.getElementById("main-period-selected");
  const mainPeriodOptions = mainPeriodMenu
    ? mainPeriodMenu.querySelectorAll(".sidebar-dropdown-option")
    : [];

  if (mainSortToggle && mainSortDropdown && mainPeriodDropdown) {
    mainSortToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      mainSortDropdown.classList.toggle("open");
      mainPeriodDropdown.classList.remove("open");
    });
    mainPeriodToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      mainPeriodDropdown.classList.toggle("open");
      mainSortDropdown.classList.remove("open");
    });
    document.addEventListener("click", function () {
      mainSortDropdown.classList.remove("open");
      mainPeriodDropdown.classList.remove("open");
    });
  }

  // Выбор сортировки
  mainSortOptions.forEach((option) => {
    option.addEventListener("click", function (e) {
      e.stopPropagation();
      mainSortOptions.forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");
      mainSortSelected.textContent = this.textContent;
      mainSortDropdown.classList.remove("open");
      applyMainSortAndPeriod();
    });
  });
  // Выбор периода
  mainPeriodOptions.forEach((option) => {
    option.addEventListener("click", function (e) {
      e.stopPropagation();
      mainPeriodOptions.forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");
      mainPeriodSelected.textContent = this.textContent;
      mainPeriodDropdown.classList.remove("open");
      applyMainSortAndPeriod();
    });
  });

  function applyMainSortAndPeriod() {
    let sortType = mainSortMenu
      .querySelector(".sidebar-dropdown-option.active")
      .getAttribute("data-sort");
    let periodType = mainPeriodMenu
      .querySelector(".sidebar-dropdown-option.active")
      .getAttribute("data-period");
    let filtered = [...jobs];
    // Фильтрация по периоду (заглушка)
    if (periodType !== "all") {
      // Здесь можно реализовать фильтрацию по дате публикации
    }
    // Сортировка
    if (sortType === "relevance") {
      // По соответствию (оставим как есть)
    } else if (sortType === "date") {
      filtered.sort((a, b) => (b.date || 0) - (a.date || 0));
    } else if (sortType === "salary-desc") {
      filtered.sort((a, b) => {
        const aSalary = a.salaryMax || a.salaryMin || 0;
        const bSalary = b.salaryMax || b.salaryMin || 0;
        if (!bSalary && aSalary) return -1;
        if (!aSalary && bSalary) return 1;
        return bSalary - aSalary;
      });
    } else if (sortType === "salary-asc") {
      filtered.sort((a, b) => {
        const aSalary = a.salaryMin || a.salaryMax || 0;
        const bSalary = b.salaryMin || b.salaryMax || 0;
        if (!aSalary && bSalary) return 1;
        if (!bSalary && aSalary) return -1;
        return aSalary - bSalary;
      });
    }
    updateJobList(filtered);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // ... существующий код ...

  // --- Мультиселекты в модальном фильтре ---
  function setupModalMultiselect(inputId, dropdownId, options) {
    const input = document.getElementById(inputId);
    const dropdown = document.getElementById(dropdownId);
    if (!input || !dropdown) return;
    let selected = [];
    input.addEventListener("click", function (e) {
      e.stopPropagation();
      dropdown.style.display =
        dropdown.style.display === "block" ? "none" : "block";
    });
    document.addEventListener("click", function () {
      dropdown.style.display = "none";
    });
    dropdown.innerHTML = "";
    options.forEach((opt) => {
      const item = document.createElement("div");
      item.textContent = opt;
      item.className = "multi-select-option";
      item.style.padding = "8px 16px";
      item.style.cursor = "pointer";
      item.addEventListener("click", function (e) {
        e.stopPropagation();
        if (selected.includes(opt)) {
          selected = selected.filter((o) => o !== opt);
        } else {
          selected.push(opt);
        }
        renderSelected();
      });
      dropdown.appendChild(item);
    });
    function renderSelected() {
      input.innerHTML = selected.length
        ? selected.join(", ")
        : '<span style="color:#b0b8c1">Выбрать...</span>';
      Array.from(dropdown.children).forEach((child) => {
        if (selected.includes(child.textContent)) {
          child.style.background = "#f3f8ff";
          child.style.color = "#2563eb";
        } else {
          child.style.background = "#fff";
          child.style.color = "#222";
        }
      });
    }
    renderSelected();
  }

  setupModalMultiselect(
    "filter-schedule-multiselect-input-modal",
    "filter-schedule-multiselect-dropdown-modal",
    [
      "5/2",
      "2/2",
      "Гибкий",
      "Сменный",
      "Вечерний",
      "Утренний",
      "Ночной",
      "Свободный",
      "Другое",
    ]
  );
  setupModalMultiselect(
    "filter-hours-multiselect-input-modal",
    "filter-hours-multiselect-dropdown-modal",
    ["4-6 часов", "6-8 часов", "8 часов", "Больше 8 часов", "Гибко", "Другое"]
  );

  // ... существующий код ...
});

// ... existing code ...
// --- МУЛЬТИСЕЛЕКТЫ ДЛЯ МОДАЛЬНОГО ФИЛЬТРА ---
const filterScheduleOptionsModal = [
  "6/1",
  "5/2",
  "4/4",
  "4/3",
  "4/2",
  "2/2",
  "2/1",
  "1/3",
  "По выходным",
  "Свободный",
  "Другое",
];
let filterSelectedSchedulesModal = [];
const filterScheduleMultiSelectModal = document.getElementById(
  "filter-schedule-multiselect-modal"
);
const filterScheduleMultiSelectInputModal = document.getElementById(
  "filter-schedule-multiselect-input-modal"
);
const filterScheduleMultiSelectDropdownModal = document.getElementById(
  "filter-schedule-multiselect-dropdown-modal"
);
const filterScheduleMultiSelectArrowModal = document.getElementById(
  "filter-schedule-multiselect-arrow-modal"
);

function renderFilterScheduleMultiSelectInputModal() {
  filterScheduleMultiSelectInputModal.innerHTML = "";
  filterSelectedSchedulesModal.forEach((val) => {
    const tag = document.createElement("span");
    tag.className = "multi-select-tag";
    tag.textContent = val;
    const close = document.createElement("span");
    close.className = "multi-select-tag-close";
    close.innerHTML = "&times;";
    close.onclick = function (e) {
      e.stopPropagation();
      filterSelectedSchedulesModal = filterSelectedSchedulesModal.filter(
        (v) => v !== val
      );
      renderFilterScheduleMultiSelectInputModal();
      renderFilterScheduleMultiSelectDropdownModal();
    };
    tag.appendChild(close);
    filterScheduleMultiSelectInputModal.appendChild(tag);
  });
  if (filterSelectedSchedulesModal.length === 0) {
    const placeholder = document.createElement("span");
    placeholder.className = "multi-select-placeholder";
    placeholder.textContent = "Выберите из списка";
    filterScheduleMultiSelectInputModal.appendChild(placeholder);
  }
}

function renderFilterScheduleMultiSelectDropdownModal() {
  filterScheduleMultiSelectDropdownModal.innerHTML = "";
  filterScheduleOptionsModal.forEach((opt) => {
    const row = document.createElement("div");
    row.className =
      "multi-select-option" +
      (filterSelectedSchedulesModal.includes(opt) ? " selected" : "");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = filterSelectedSchedulesModal.includes(opt);
    checkbox.onchange = function (e) {
      if (this.checked) {
        if (!filterSelectedSchedulesModal.includes(opt))
          filterSelectedSchedulesModal.push(opt);
      } else {
        filterSelectedSchedulesModal = filterSelectedSchedulesModal.filter(
          (v) => v !== opt
        );
      }
      renderFilterScheduleMultiSelectInputModal();
      renderFilterScheduleMultiSelectDropdownModal();
    };
    const label = document.createElement("label");
    label.textContent = opt;
    row.appendChild(checkbox);
    row.appendChild(label);
    filterScheduleMultiSelectDropdownModal.appendChild(row);
  });
}

function openFilterScheduleMultiSelectDropdownModal() {
  filterScheduleMultiSelectDropdownModal.style.display = "block";
  renderFilterScheduleMultiSelectDropdownModal();
  filterScheduleMultiSelectModal.classList.add("active");
}
function closeFilterScheduleMultiSelectDropdownModal() {
  filterScheduleMultiSelectDropdownModal.style.display = "none";
  filterScheduleMultiSelectModal.classList.remove("active");
}

if (filterScheduleMultiSelectInputModal) {
  filterScheduleMultiSelectInputModal.addEventListener(
    "click",
    openFilterScheduleMultiSelectDropdownModal
  );
  filterScheduleMultiSelectInputModal.addEventListener(
    "focus",
    openFilterScheduleMultiSelectDropdownModal
  );
}
if (filterScheduleMultiSelectArrowModal) {
  filterScheduleMultiSelectArrowModal.addEventListener("click", function (e) {
    e.stopPropagation();
    if (filterScheduleMultiSelectDropdownModal.style.display === "block") {
      closeFilterScheduleMultiSelectDropdownModal();
    } else {
      openFilterScheduleMultiSelectDropdownModal();
    }
  });
}
document.addEventListener("click", function (e) {
  if (
    filterScheduleMultiSelectModal &&
    !filterScheduleMultiSelectModal.contains(e.target)
  ) {
    closeFilterScheduleMultiSelectDropdownModal();
  }
});
renderFilterScheduleMultiSelectInputModal();

// --- МУЛЬТИСЕЛЕКТ ДЛЯ РАБОЧИХ ЧАСОВ В ДЕНЬ (МОДАЛЬНЫЙ ФИЛЬТР) ---
const filterHoursOptionsModal = [
  "4",
  "6",
  "8",
  "10",
  "12",
  "По договорённости",
  "Другое",
];
let filterSelectedHoursModal = [];
const filterHoursMultiSelectModal = document.getElementById(
  "filter-hours-multiselect-modal"
);
const filterHoursMultiSelectInputModal = document.getElementById(
  "filter-hours-multiselect-input-modal"
);
const filterHoursMultiSelectDropdownModal = document.getElementById(
  "filter-hours-multiselect-dropdown-modal"
);
const filterHoursMultiSelectArrowModal = document.getElementById(
  "filter-hours-multiselect-arrow-modal"
);

function renderFilterHoursMultiSelectInputModal() {
  filterHoursMultiSelectInputModal.innerHTML = "";
  filterSelectedHoursModal.forEach((val) => {
    const tag = document.createElement("span");
    tag.className = "multi-select-tag";
    tag.textContent = val;
    const close = document.createElement("span");
    close.className = "multi-select-tag-close";
    close.innerHTML = "&times;";
    close.onclick = function (e) {
      e.stopPropagation();
      filterSelectedHoursModal = filterSelectedHoursModal.filter(
        (v) => v !== val
      );
      renderFilterHoursMultiSelectInputModal();
      renderFilterHoursMultiSelectDropdownModal();
    };
    tag.appendChild(close);
    filterHoursMultiSelectInputModal.appendChild(tag);
  });
  if (filterSelectedHoursModal.length === 0) {
    const placeholder = document.createElement("span");
    placeholder.className = "multi-select-placeholder";
    placeholder.textContent = "Выберите из списка";
    filterHoursMultiSelectInputModal.appendChild(placeholder);
  }
}

function renderFilterHoursMultiSelectDropdownModal() {
  filterHoursMultiSelectDropdownModal.innerHTML = "";
  filterHoursOptionsModal.forEach((opt) => {
    const row = document.createElement("div");
    row.className =
      "multi-select-option" +
      (filterSelectedHoursModal.includes(opt) ? " selected" : "");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = filterSelectedHoursModal.includes(opt);
    checkbox.onchange = function (e) {
      if (this.checked) {
        if (!filterSelectedHoursModal.includes(opt))
          filterSelectedHoursModal.push(opt);
      } else {
        filterSelectedHoursModal = filterSelectedHoursModal.filter(
          (v) => v !== opt
        );
      }
      renderFilterHoursMultiSelectInputModal();
      renderFilterHoursMultiSelectDropdownModal();
    };
    const label = document.createElement("label");
    label.textContent = opt;
    row.appendChild(checkbox);
    row.appendChild(label);
    filterHoursMultiSelectDropdownModal.appendChild(row);
  });
}

function openFilterHoursMultiSelectDropdownModal() {
  filterHoursMultiSelectDropdownModal.style.display = "block";
  renderFilterHoursMultiSelectDropdownModal();
  filterHoursMultiSelectModal.classList.add("active");
}
function closeFilterHoursMultiSelectDropdownModal() {
  filterHoursMultiSelectDropdownModal.style.display = "none";
  filterHoursMultiSelectModal.classList.remove("active");
}

if (filterHoursMultiSelectInputModal) {
  filterHoursMultiSelectInputModal.addEventListener(
    "click",
    openFilterHoursMultiSelectDropdownModal
  );
  filterHoursMultiSelectInputModal.addEventListener(
    "focus",
    openFilterHoursMultiSelectDropdownModal
  );
}
if (filterHoursMultiSelectArrowModal) {
  filterHoursMultiSelectArrowModal.addEventListener("click", function (e) {
    e.stopPropagation();
    if (filterHoursMultiSelectDropdownModal.style.display === "block") {
      closeFilterHoursMultiSelectDropdownModal();
    } else {
      openFilterHoursMultiSelectDropdownModal();
    }
  });
}
document.addEventListener("click", function (e) {
  if (
    filterHoursMultiSelectModal &&
    !filterHoursMultiSelectModal.contains(e.target)
  ) {
    closeFilterHoursMultiSelectDropdownModal();
  }
});
renderFilterHoursMultiSelectInputModal();
// ... existing code ...

// --- ПАГИНАЦИЯ ВАКАНСИЙ ---
const vacancyList = document.getElementById("vacancy-list");
const pagination = document.getElementById("pagination");
let allVacancies = Array.from(vacancyList.children);
const vacanciesPerPage = 10;
let currentPage = 1;

function renderVacanciesPage(page) {
  currentPage = page;
  const start = (page - 1) * vacanciesPerPage;
  const end = start + vacanciesPerPage;
  allVacancies.forEach((el, i) => {
    el.style.display = i >= start && i < end ? "" : "none";
  });
  renderPagination();
}

function renderPagination() {
  const total = allVacancies.length;
  const pages = Math.ceil(total / vacanciesPerPage);
  if (pages <= 1) {
    pagination.innerHTML = `<button class="pagination-btn active">1</button><button class="pagination-arrow" disabled>&#8594;</button>`;
    return;
  }
  let html = "";
  // Prev arrow
  html += `<button class="pagination-arrow" ${
    currentPage === 1 ? "disabled" : ""
  } onclick="goToPage(${currentPage - 1})">&#8592;</button>`;
  // Page numbers
  let pageBtns = [];
  if (pages <= 8) {
    for (let i = 1; i <= pages; i++) {
      pageBtns.push(i);
    }
  } else {
    pageBtns = [1];
    if (currentPage > 4) pageBtns.push("...");
    let start = Math.max(2, currentPage - 2);
    let end = Math.min(pages - 1, currentPage + 2);
    for (let i = start; i <= end; i++) pageBtns.push(i);
    if (currentPage + 2 < pages - 1) pageBtns.push("...");
    pageBtns.push(pages);
  }
  for (let btn of pageBtns) {
    if (btn === "...") {
      html += `<span class="pagination-ellipsis">...</span>`;
    } else {
      html += `<button class="pagination-btn${
        btn === currentPage ? " active" : ""
      }" onclick="goToPage(${btn})">${btn}</button>`;
    }
  }
  // Next arrow
  html += `<button class="pagination-arrow" ${
    currentPage === pages ? "disabled" : ""
  } onclick="goToPage(${currentPage + 1})">&#8594;</button>`;
  pagination.innerHTML = html;
}

window.goToPage = function (page) {
  const total = allVacancies.length;
  const pages = Math.ceil(total / vacanciesPerPage);
  if (page < 1 || page > pages) return;
  renderVacanciesPage(page);
};

// --- СОРТИРОВКА ДЛЯ ПАГИНАЦИИ ---
document.addEventListener("DOMContentLoaded", function () {
  // ... существующий код ...
  const mainSortMenu = document.getElementById("main-sort-menu");
  const mainSortOptions = mainSortMenu
    ? mainSortMenu.querySelectorAll(".sidebar-dropdown-option")
    : [];
  mainSortOptions.forEach((option) => {
    option.addEventListener("click", function (e) {
      // ... существующий код ...
      // После сортировки обновляем allVacancies и пагинацию
      setTimeout(() => {
        allVacancies = Array.from(vacancyList.children);
        renderVacanciesPage(1);
      }, 0);
    });
  });
  // ... существующий код ...
});
// ... существующий код ...

// ... существующий код ...
document.addEventListener("DOMContentLoaded", function () {
  // ... существующий код ...

  // --- ФИЛЬТР НА ГЛАВНОЙ СТРАНИЦЕ ---
  // Берём aside.main-filter, который НЕ находится внутри .modal (т.е. не модальный фильтр)
  const mainFilters = Array.from(
    document.querySelectorAll("aside.main-filter")
  ).filter((f) => !f.closest(".modal"));
  mainFilters.forEach((mainFilter) => {
    const applyBtn = mainFilter.querySelector(".apply-btn");
    const clearBtn = mainFilter.querySelector(".clear-btn");
    applyBtn &&
      applyBtn.addEventListener("click", function (e) {
        e.preventDefault();
        // Собираем значения фильтров
        const salaryRadios = mainFilter.querySelectorAll(
          'input[type="radio"][name="salary"]'
        );
        let salaryMin = 0;
        salaryRadios.forEach((radio) => {
          if (radio.checked && radio.value && radio.value.startsWith("from_")) {
            const match = radio.value.match(/from_(\d+)/);
            if (match) salaryMin = parseInt(match[1]);
          }
        });
        const salaryOwnRadio = mainFilter.querySelector("#salary-own-radio");
        const salaryOwnInput = mainFilter.querySelector("#salary-own-input");
        if (
          salaryOwnRadio &&
          salaryOwnRadio.checked &&
          salaryOwnInput &&
          salaryOwnInput.value
        ) {
          salaryMin = parseInt(salaryOwnInput.value.replace(/\D/g, "")) || 0;
        }
        // Опыт
        let exp = "";
        const expRadios = mainFilter.querySelectorAll(
          'input[type="radio"][name="exp"]'
        );
        expRadios.forEach((radio) => {
          if (radio.checked) exp = radio.parentElement.textContent.trim();
        });
        // Тип занятости
        let employments = [];
        mainFilter.querySelectorAll('input[type="checkbox"]').forEach((chk) => {
          if (
            chk.checked &&
            chk.parentElement.textContent.includes("занятость")
          ) {
            employments.push(chk.parentElement.textContent.trim());
          }
        });
        // Формат работы
        let formats = [];
        mainFilter.querySelectorAll('input[type="checkbox"]').forEach((chk) => {
          if (
            chk.checked &&
            [
              "На месте работодателя",
              "Удалённо",
              "Гибрид",
              "Разъездной",
            ].includes(chk.parentElement.textContent.trim())
          ) {
            formats.push(chk.parentElement.textContent.trim());
          }
        });
        // Ключевые слова
        const searchInput = document.getElementById("search-input");
        const searchValue = searchInput
          ? searchInput.value.trim().toLowerCase()
          : "";
        // Исключить слова
        const excludeInput = mainFilter.querySelector(
          'input[placeholder*="Исключить слова"]'
        );
        let excludeWords = [];
        if (excludeInput && excludeInput.value.trim()) {
          excludeWords = excludeInput.value
            .split(",")
            .map((w) => w.trim().toLowerCase())
            .filter(Boolean);
        }
        // Фильтрация
        let filtered = jobs.filter((job) => {
          // Зарплата
          if (salaryMin && (!job.salaryMin || job.salaryMin < salaryMin))
            return false;
          // Опыт
          if (exp && exp !== "Не имеет значения") {
            if (exp === "Без опыта" && job.experience !== "noExperience")
              return false;
            if (exp === "От 1 года до 3 лет" && job.experience !== "1-3")
              return false;
            if (exp === "От 3 до 6 лет" && job.experience !== "3-6")
              return false;
          }
          // Тип занятости
          if (employments.length) {
            let match = false;
            employments.forEach((type) => {
              if (type.includes("Полная") && job.employment === "full")
                match = true;
              if (type.includes("Частичная") && job.employment === "part")
                match = true;
              if (type.includes("Проектная") && job.employment === "project")
                match = true;
              if (type.includes("Вахта") && job.employment === "shift")
                match = true;
              if (type.includes("Стажировка") && job.internship === "yes")
                match = true;
              if (
                type.includes("Для выпускников") &&
                job.experience === "noExperience"
              )
                match = true;
            });
            if (!match) return false;
          }
          // Формат работы
          if (formats.length) {
            let match = false;
            formats.forEach((fmt) => {
              if (fmt.includes("На месте") && job.workFormat === "office")
                match = true;
              if (fmt.includes("Удалённо") && job.workFormat === "remote")
                match = true;
              if (fmt.includes("Гибрид") && job.workFormat === "hybrid")
                match = true;
              if (fmt.includes("Разъездной") && job.workFormat === "mobile")
                match = true;
            });
            if (!match) return false;
          }
          // Ключевые слова
          if (searchValue) {
            const inTitle = job.title.toLowerCase().includes(searchValue);
            const inCompany = job.company.toLowerCase().includes(searchValue);
            if (!inTitle && !inCompany) return false;
          }
          // Исключить слова
          if (excludeWords.length) {
            const title = job.title.toLowerCase();
            const company = job.company.toLowerCase();
            for (let word of excludeWords) {
              if (title.includes(word) || company.includes(word)) return false;
            }
          }
          return true;
        });
        updateJobList(filtered);
        allVacancies = Array.from(
          document.getElementById("vacancy-list").children
        );
        renderVacanciesPage(1);
      });
    clearBtn &&
      clearBtn.addEventListener("click", function (e) {
        e.preventDefault();
        // Сбросить все фильтры
        mainFilter
          .querySelectorAll('input[type="radio"][name="salary"]')
          .forEach((r) => (r.checked = r.hasAttribute("checked")));
        if (mainFilter.querySelector("#salary-own-input"))
          mainFilter.querySelector("#salary-own-input").value = "";
        mainFilter
          .querySelectorAll('input[type="radio"][name="exp"]')
          .forEach((r, i) => (r.checked = i === 0));
        mainFilter
          .querySelectorAll('input[type="checkbox"]')
          .forEach((chk) => (chk.checked = false));
        if (document.getElementById("search-input"))
          document.getElementById("search-input").value = "";
        updateJobList(jobs);
        allVacancies = Array.from(
          document.getElementById("vacancy-list").children
        );
        renderVacanciesPage(1);
      });
  });

  // --- ФИЛЬТР В МОДАЛЬНОМ ОКНЕ ---
  // Берём aside.main-filter, который находится внутри .modal (т.е. модальный фильтр)
  const modalFilters = Array.from(
    document.querySelectorAll("aside.main-filter")
  ).filter((f) => f.closest(".modal"));
  modalFilters.forEach((modalFilter) => {
    const applyBtn = modalFilter.querySelector(".apply-btn");
    const clearBtn = modalFilter.querySelector(".clear-btn");

    // Инициализация списка вакансий в модальном окне
    const modalVacancyList = document.getElementById("modal-vacancy-list");
    if (modalVacancyList) {
      // Показываем все вакансии при открытии модального окна
      jobs.forEach((job) => {
        const card = createVacancyCard(job);
        modalVacancyList.appendChild(card);
      });
    }

    applyBtn &&
      applyBtn.addEventListener("click", function (e) {
        e.preventDefault();

        // Собираем значения фильтров
        const salaryRadios = modalFilter.querySelectorAll(
          'input[type="radio"][name="salary-modal"]'
        );
        let salaryMin = 0;
        salaryRadios.forEach((radio) => {
          if (radio.checked) {
            const text = radio.parentElement.textContent.trim();
            if (text.includes("от")) {
              const match = text.match(/от (\d+)/);
              if (match) salaryMin = parseInt(match[1].replace(/\s/g, ""));
            }
          }
        });

        // Проверяем своё значение зарплаты
        const salaryOwnRadio = modalFilter.querySelector(
          "#salary-own-radio-modal"
        );
        const salaryOwnInput = modalFilter.querySelector(
          "#salary-own-input-modal"
        );
        if (
          salaryOwnRadio &&
          salaryOwnRadio.checked &&
          salaryOwnInput &&
          salaryOwnInput.value
        ) {
          salaryMin = parseInt(salaryOwnInput.value.replace(/\D/g, "")) || 0;
        }

        // Опыт
        let exp = "";
        const expRadios = modalFilter.querySelectorAll(
          'input[type="radio"][name="exp-modal"]'
        );
        expRadios.forEach((radio) => {
          if (radio.checked) {
            exp = radio.parentElement.textContent.trim();
          }
        });

        // Тип занятости
        let employments = [];
        modalFilter
          .querySelectorAll('input[type="checkbox"]')
          .forEach((chk) => {
            if (
              chk.checked &&
              chk.parentElement.textContent.includes("занятость")
            ) {
              employments.push(chk.parentElement.textContent.trim());
            }
          });

        // Формат работы
        let formats = [];
        modalFilter
          .querySelectorAll('input[type="checkbox"]')
          .forEach((chk) => {
            if (
              chk.checked &&
              [
                "На месте работодателя",
                "Удалённо",
                "Гибрид",
                "Разъездной",
              ].includes(chk.parentElement.textContent.trim())
            ) {
              formats.push(chk.parentElement.textContent.trim());
            }
          });

        // Фильтрация
        filteredJobs = jobs.filter((job) => {
          // Зарплата
          if (salaryMin && (!job.salaryMin || job.salaryMin < salaryMin))
            return false;

          // Опыт
          if (exp && exp !== "Не имеет значения") {
            if (exp === "Нет опыта" && job.experience !== "noExperience")
              return false;
            if (exp === "От 1 года до 3 лет" && job.experience !== "1-3")
              return false;
            if (exp === "От 3 до 6 лет" && job.experience !== "3-6")
              return false;
            if (exp === "Более 6 лет" && job.experience !== "6+") return false;
          }

          // Тип занятости
          if (employments.length) {
            let match = false;
            employments.forEach((type) => {
              if (type.includes("Полная") && job.employment === "full")
                match = true;
              if (type.includes("Частичная") && job.employment === "part")
                match = true;
              if (type.includes("Проектная") && job.employment === "project")
                match = true;
              if (type.includes("Вахта") && job.employment === "shift")
                match = true;
              if (type.includes("Стажировка") && job.internship === "yes")
                match = true;
              if (
                type.includes("Для выпускников") &&
                job.experience === "noExperience"
              )
                match = true;
            });
            if (!match) return false;
          }

          // Формат работы
          if (formats.length) {
            let match = false;
            formats.forEach((fmt) => {
              if (fmt.includes("На месте") && job.workFormat === "office")
                match = true;
              if (fmt.includes("Удалённо") && job.workFormat === "remote")
                match = true;
              if (fmt.includes("Гибрид") && job.workFormat === "hybrid")
                match = true;
              if (fmt.includes("Разъездной") && job.workFormat === "mobile")
                match = true;
            });
            if (!match) return false;
          }

          return true;
        });

        // Обновляем список в модальном окне
        if (modalVacancyList) {
          modalVacancyList.innerHTML = "";
          filteredJobs.forEach((job) => {
            const card = createVacancyCard(job);
            modalVacancyList.appendChild(card);
          });
        }
      });

    clearBtn &&
      clearBtn.addEventListener("click", function (e) {
        e.preventDefault();

        // Сбросить все фильтры
        modalFilter
          .querySelectorAll('input[type="radio"][name="salary-modal"]')
          .forEach((r, i) => (r.checked = i === 0));
        if (modalFilter.querySelector("#salary-own-input-modal")) {
          modalFilter.querySelector("#salary-own-input-modal").value = "";
        }
        modalFilter
          .querySelectorAll('input[type="radio"][name="exp-modal"]')
          .forEach((r, i) => (r.checked = i === 0));
        modalFilter
          .querySelectorAll('input[type="checkbox"]')
          .forEach((chk) => (chk.checked = false));

        // Показать все вакансии в модальном списке
        if (modalVacancyList) {
          modalVacancyList.innerHTML = "";
          jobs.forEach((job) => {
            const card = createVacancyCard(job);
            modalVacancyList.appendChild(card);
          });
        }
      });
  });

  // Вспомогательная функция для создания карточки вакансии
  function createVacancyCard(job) {
    const card = document.createElement("div");
    card.className = "vacancy-card";

    let salaryText = "";
    if (job.salaryMin && job.salaryMax) {
      salaryText = `${job.salaryMin.toLocaleString()} – ${job.salaryMax.toLocaleString()} ₽ за месяц`;
    } else if (job.salaryMin) {
      salaryText = `от ${job.salaryMin.toLocaleString()} ₽ за месяц`;
    } else {
      salaryText = "Зарплата не указана";
    }

    let tags = "";
    if (job.experience === "noExperience") {
      tags += '<span class="vacancy-card-tag">Без опыта</span>';
    } else if (job.experience) {
      tags += `<span class="vacancy-card-tag">Опыт ${job.experience}</span>`;
    }

    card.innerHTML = `
      <div class="vacancy-card-title-row">
        <span class="vacancy-card-title">${job.title}</span>
      </div>
      <div class="vacancy-card-salary-row" style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
        <span class="vacancy-card-salary">${salaryText}</span>
        ${tags}
      </div>
      <div class="vacancy-card-company-row">
        <span class="vacancy-card-company">${job.company}</span>
      </div>
      <div class="vacancy-card-address">${job.city}${
      job.description ? ", " + job.description : ""
    }</div>
    `;

    return card;
  }
});
// ... существующий код ...

// Функция для добавления нового блока опыта работы
function addWorkExperience() {
  const container = document.getElementById("work-experience-container");
  const newItem = document.createElement("div");
  newItem.className = "work-experience-item";
  newItem.innerHTML = `
    <div class="form-group">
      <label>Компания</label>
      <input type="text" class="work-company" required>
    </div>
    <div class="form-group">
      <label>Должность</label>
      <input type="text" class="work-position" required>
    </div>
    <div class="form-group">
      <label>Период работы</label>
      <div class="date-inputs">
        <input type="month" class="work-start" required>
        <input type="month" class="work-end">
      </div>
    </div>
    <div class="form-group">
      <label>Обязанности</label>
      <textarea class="work-responsibilities" required></textarea>
    </div>
  `;
  container.appendChild(newItem);
}

// Обработка формы создания резюме
document.addEventListener("DOMContentLoaded", function () {
  const createResumeForm = document.getElementById("create-resume-form");
  if (createResumeForm) {
    createResumeForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Собираем данные формы
      const resumeData = {
        title: document.getElementById("resume-title").value,
        salary: {
          min: document.getElementById("resume-salary-min").value,
          max: document.getElementById("resume-salary-max").value,
        },
        experience: document.getElementById("resume-experience").value,
        personalInfo: {
          name: document.getElementById("resume-name").value,
          surname: document.getElementById("resume-surname").value,
          phone: document.getElementById("resume-phone").value,
          email: document.getElementById("resume-email").value,
        },
        education: {
          level: document.getElementById("resume-education").value,
          university: document.getElementById("resume-university").value,
          specialty: document.getElementById("resume-specialty").value,
          graduationYear: document.getElementById("resume-graduation").value,
        },
        workExperience: [],
        skills: Array.from(document.querySelectorAll(".skill-tag")).map((tag) =>
          tag.textContent.trim()
        ),
        about: document.getElementById("resume-about").value,
      };

      // Собираем опыт работы
      document.querySelectorAll(".work-experience-item").forEach((item) => {
        resumeData.workExperience.push({
          company: item.querySelector(".work-company").value,
          position: item.querySelector(".work-position").value,
          period: {
            start: item.querySelector(".work-start").value,
            end: item.querySelector(".work-end").value,
          },
          responsibilities: item.querySelector(".work-responsibilities").value,
        });
      });

      // TODO: Отправка данных на сервер
      console.log("Resume data:", resumeData);

      // Показываем уведомление об успешном создании
      showNotification("Резюме успешно создано!", "success");

      // Перенаправляем на главную страницу
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    });
  }

  // Обработка навыков
  const skillsInput = document.getElementById("resume-skills-input");
  const skillsSuggestions = document.getElementById("skills-suggestions");
  const selectedSkills = document.getElementById("selected-skills");

  if (skillsInput && skillsSuggestions && selectedSkills) {
    // Список популярных навыков для подсказок
    const popularSkills = [
      "JavaScript",
      "Python",
      "Java",
      "C++",
      "HTML",
      "CSS",
      "React",
      "Node.js",
      "SQL",
      "Git",
      "Docker",
      "AWS",
      "Linux",
      "Agile",
      "Scrum",
      "Project Management",
      "Communication",
      "Leadership",
    ];

    skillsInput.addEventListener("input", function () {
      const value = this.value.toLowerCase();
      if (value.length < 2) {
        skillsSuggestions.style.display = "none";
        return;
      }

      const filteredSkills = popularSkills.filter((skill) =>
        skill.toLowerCase().includes(value)
      );

      if (filteredSkills.length > 0) {
        skillsSuggestions.innerHTML = filteredSkills
          .map((skill) => `<li>${skill}</li>`)
          .join("");
        skillsSuggestions.style.display = "block";
      } else {
        skillsSuggestions.style.display = "none";
      }
    });

    skillsSuggestions.addEventListener("click", function (e) {
      if (e.target.tagName === "LI") {
        const skill = e.target.textContent;
        addSkill(skill);
        skillsInput.value = "";
        skillsSuggestions.style.display = "none";
      }
    });

    skillsInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && this.value.trim()) {
        e.preventDefault();
        addSkill(this.value.trim());
        this.value = "";
        skillsSuggestions.style.display = "none";
      }
    });
  }
});

// Функция для добавления навыка
function addSkill(skill) {
  const selectedSkills = document.getElementById("selected-skills");
  if (!selectedSkills) return;

  // Проверяем, не добавлен ли уже такой навык
  const existingSkills = Array.from(
    selectedSkills.querySelectorAll(".skill-tag")
  ).map((tag) => tag.textContent.trim());

  if (existingSkills.includes(skill)) return;

  const skillTag = document.createElement("div");
  skillTag.className = "skill-tag";
  skillTag.innerHTML = `
    ${skill}
    <button onclick="this.parentElement.remove()">×</button>
  `;
  selectedSkills.appendChild(skillTag);
}

// ... существующий код ...

// Обработка кнопки "Создать резюме"
document.addEventListener("DOMContentLoaded", function () {
  const vacancyBtn = document.querySelector(".vacancy-btn");
  if (vacancyBtn && vacancyBtn.textContent.trim() === "Создать резюме") {
    vacancyBtn.onclick = function () {
      window.location.href = "create-resume.html";
    };
  }
});

// ... существующий код ...

document.addEventListener("DOMContentLoaded", function () {
  var btn = document.getElementById("choose-profession-btn");
  if (btn) {
    btn.addEventListener("click", function () {
      // Скрыть первый шаг, показать второй
      var step1 = document.getElementById("resume-step-1");
      var step2 = document.getElementById("resume-step-2");
      if (step1 && step2) {
        step1.style.display = "none";
        step2.style.display = "";
      }
      // Обновить прогресс-бар
      var segments = document.querySelectorAll(".resume-progress-segment");
      segments.forEach(function (seg, idx) {
        seg.classList.remove("active");
        if (idx === 1) seg.classList.add("active");
      });
      // Показать кнопки действий
      var actions = document.querySelector(".resume-step-actions");
      if (actions) actions.classList.remove("hidden");
    });
  }
});
