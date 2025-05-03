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

const availableSkills = [
  "Python",
  "Django",
  "PostgreSQL",
  "Git",
  "React",
  "TypeScript",
  "HTML",
  "CSS",
  "JavaScript",
  "Adobe Photoshop",
  "Illustrator",
  "1С",
  "Digital-маркетинг",
  "Google Analytics",
  "SEO",
  "Копирайтинг",
  "Продажи",
  "Коммуникация",
  "Переговоры",
  "Флористика",
  "Креативность",
  "Обслуживание клиентов",
  "Linux",
  "Windows",
  "Сетевые протоколы",
  "Безопасность",
  "Рекрутинг",
  "Трудовое законодательство",
  "Водительские навыки",
  "Клиентоориентированность",
  "Кулинария",
  "Санитарные нормы",
  "Командная работа",
];

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
  if (!profileMenu.contains(e.target) && !authLink.contains(e.target)) {
    profileMenu.classList.remove("active");
  }
});

function updateHeader() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const nav = document.getElementById("header-nav");
  const authLink = document.getElementById("auth-link");
  const oldCreateBtn = nav.querySelector(".create-btn");
  if (oldCreateBtn) oldCreateBtn.remove();

  if (currentUser.email) {
    authLink.textContent = currentUser.name || "Профиль";
    authLink.onclick = toggleProfileMenu;
    document.getElementById("profile-my-items").textContent = "Мои избранные";
    if (currentUser.role === "employer") {
      const createBtn = document.createElement("button");
      createBtn.className = "create-btn";
      createBtn.textContent = "Создать вакансию";
      createBtn.onclick = openCreateJobModal;
      nav.insertBefore(createBtn, document.getElementById("auth-link"));
    } else {
      const createBtn = document.createElement("button");
      createBtn.className = "create-btn";
      createBtn.textContent = "Создать резюме";
      createBtn.onclick = function () {
        showNotification("Переход к созданию резюме");
      };
      nav.insertBefore(createBtn, document.getElementById("auth-link"));
    }
  } else {
    authLink.textContent = "Войти";
    authLink.onclick = () => showSection("auth");
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
  document.getElementById("profile-menu").classList.remove("active");
  showSection("main");
  updateHeader();
  showNotification("Выход выполнен");
}

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
  const jobList = document.getElementById("job-list");
  jobList.innerHTML = ""; // Очищаем весь список, включая старые заголовки и карточки

  // Добавляем заголовок "Избранные вакансии", если включен режим избранного
  if (isShowingFavorites) {
    const favoritesTitle = document.createElement("h2");
    favoritesTitle.className = "favorites-title";
    favoritesTitle.textContent = "Избранные вакансии";
    jobList.appendChild(favoritesTitle);
  }

  filteredJobs.forEach((job) => {
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
    card.setAttribute("data-lat", job.lat);
    card.setAttribute("data-lng", job.lng);
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
      <button class="respond-btn${
        respondedJobs.includes(job.title) ? " responded" : ""
      }" onclick="respondToJob('${job.title}')">Откликнуться</button>
      <button class="track-btn" onclick="trackOnMap(${job.lat}, ${job.lng}, '${
      job.title
    }')">Показать на карте</button>
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

function updateMap(filteredJobs) {
  if (!map) return;
  markers.forEach((marker) => map.removeLayer(marker));
  markers = [];
  filteredJobs.forEach((job) => {
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
    const marker = L.marker([job.lat, job.lng])
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
  const query = document.getElementById("search-input").value.toLowerCase();
  const city = document.getElementById("city-select").value;
  const experience = document.getElementById("experience-filter").value;
  const employment = document.getElementById("employment-filter").value;
  const schedule = document.getElementById("schedule-filter").value;
  const hours = document.getElementById("hours-filter").value;
  const internship = document.getElementById("internship-filter").checked
    ? "yes"
    : "";
  const workFormat = document.getElementById("work-format-filter").value;
  const salary = document.getElementById("salary-filter").value;

  const filteredJobs = jobs.filter((job) => {
    const matchesQuery =
      query === "" ||
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.fullDescription.toLowerCase().includes(query);
    const matchesCity = city === "Вся Россия" || job.city === city;
    const matchesExperience =
      experience === "" || job.experience === experience;
    const matchesEmployment =
      employment === "" || job.employment === employment;
    const matchesSchedule = schedule === "" || job.schedule === schedule;
    const matchesHours = hours === "" || job.hours === hours;
    const matchesInternship =
      internship === "" || job.internship === internship;
    const matchesWorkFormat =
      workFormat === "" || job.workFormat === workFormat;
    const matchesSalary =
      !salary || parseInt(job.salaryMin) >= parseInt(salary);
    return (
      matchesQuery &&
      matchesCity &&
      matchesExperience &&
      matchesEmployment &&
      matchesSchedule &&
      matchesHours &&
      matchesInternship &&
      matchesWorkFormat &&
      matchesSalary
    );
  });

  isShowingFavorites = false;
  isShowingResponses = false;
  document.querySelector("#header-nav .fa-heart").classList.remove("active");
  document.querySelector("#header-nav .fa-check").classList.remove("active");
  updateJobList(filteredJobs);
  updateMap(filteredJobs);
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
  isShowingFavorites = false;
  isShowingResponses = false;
  document.querySelector("#header-nav .fa-heart").classList.remove("active");
  document.querySelector("#header-nav .fa-check").classList.remove("active");
  document.getElementById("search-input").value = "";
  document.getElementById("clear-input").classList.remove("visible");
  document.getElementById("city-select").value = "Грозный";
  document.getElementById("sort-select").value = "default";
  clearFilters();
  showSection("main");
  updateJobList(jobs);
  updateMap(jobs);
  showNotification("Возвращение на главную страницу");
}

// Инициализация VK SDK
VK.init({
  apiId: "53524024", // Ваш client_id
});

// Функция для входа через ВКонтакте
function handleVkLogin() {
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
        showNotification("Ошибка входа через ВКонтакте");
      }
    },
    VK.access.EMAIL // Запрашиваем доступ к email (если доступно)
  );
}

function handleVkRegister() {
  // Регистрация через ВКонтакте аналогична входу
  handleVkLogin();
}
