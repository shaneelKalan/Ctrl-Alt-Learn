import type { GuideCard, Mission } from "./course";

const opsDesk = "ESTUDIO DE SOPORTE";
const breakRoom = "SALA DE DESCANSO";
const briefingRoom = "SALA DE BRIEFING";

export const advancedMissionsEs: Mission[] = [
  {
    id: "adv-prompting",
    number: 1,
    title: "Ingeniería de prompts a fondo",
    shortTitle: "Ingeniería de prompts",
    kicker: "MAESTRÍA DEL PROMPT",
    description:
      "Ve más allá del prompt básico. Aprende los cuatro diales que convierten una respuesta aceptable en una excelente, y los patrones pro que hacen a Copilot confiable.",
    minutes: 5,
    rule: "Rol, contexto, restricciones, ejemplos.",
    ruleDetail:
      "Un prompt pro fija un rol, ancla al modelo en contexto real, nombra las restricciones y el formato, y muestra un ejemplo. Luego itera.",
    steps: [
      {
        id: "four-dials",
        kind: "lesson",
        label: "Aprende",
        title: "Los cuatro diales de un gran prompt",
        intro: "Ya conoces Tarea + Contexto + Formato. Estos son los cuatro diales que giran los profesionales para obtener más.",
        scene: {
          speaker: "MAYA",
          role: "COORDINADORA DE OPERACIONES",
          bubble: "Mis prompts están bien. Pero las respuestas de Jordan siempre son más afinadas. ¿Qué diales gira él?",
          caption: "Misma herramienta, mejores resultados. Está en cómo pides.",
          location: briefingRoom,
        },
        beats: [
          {
            icon: "🎭",
            title: "Dial 1: Rol",
            copy: "“Eres un analista de operaciones que escribe para la dirección.” Un rol enfoca al instante la experiencia, el tono y el nivel de la respuesta.",
          },
          {
            icon: "📎",
            title: "Dial 2: El contexto que aportas",
            copy: "Pega el material fuente real (seguro). Un prompt anclado le gana a uno de memoria siempre, y alucina mucho menos.",
          },
          {
            icon: "📐",
            title: "Dial 3: Restricciones + formato",
            copy: "Longitud, tono, qué incluir, qué omitir, y la forma exacta: tres viñetas, una tabla, un correo de menos de 120 palabras.",
          },
          {
            icon: "🧩",
            title: "Dial 4: Ejemplos (few-shot)",
            copy: "Muestra un ejemplo de buena respuesta. El modelo imita lo que ve, así que una muestra vale un párrafo de instrucciones.",
          },
        ],
      },
      {
        id: "best-prompt",
        kind: "choice",
        label: "Compara",
        dimension: "promptCraft",
        title: "Tres prompts, mismo objetivo. ¿Cuál está mejor diseñado?",
        intro: "Los tres piden un resumen de cambio de turno. Solo uno gira los cuatro diales.",
        scene: {
          speaker: "JORDAN",
          role: "LÍDER DE ATENCIÓN AL CLIENTE",
          bubble: "Ordénalos por mí. ¿Cuál va a dar el resultado más limpio?",
          caption: "Detecta el que no deja nada al azar.",
          location: opsDesk,
        },
        choices: [
          {
            id: "polite",
            label: "“Por favor escribe un resumen de turno muy bueno y detallado.”",
            detail: "Educado y entusiasta.",
            correct: false,
            coach:
              "La cortesía no es información. Sin rol, sin fuente, sin formato, sin ejemplo. El modelo tiene que adivinar todo lo que importa.",
          },
          {
            id: "engineered",
            label: "“Eres el líder de turno saliente. Con este registro [pega], escribe 3 viñetas…”",
            detail: "“…estado, temas abiertos, próximas acciones; menos de 120 palabras; señala vacíos en vez de adivinar. Ejemplo: [viñeta muestra].”",
            correct: true,
            coach:
              "Los cuatro diales: rol, contexto anclado, restricciones + formato, y un ejemplo. Este prompt se gana una respuesta confiable y lista para usar.",
          },
          {
            id: "dump",
            label: "“Resume todo lo de hoy, aquí están todos nuestros datos [pega todo].”",
            detail: "Dale el panorama completo.",
            correct: false,
            coach:
              "Volcar datos sin filtrar es un riesgo de seguridad y de calidad. Da la fuente mínima necesaria y una petición precisa, no todo.",
          },
        ],
      },
      {
        id: "build-advanced",
        kind: "builder",
        label: "Arma",
        dimension: "promptCraft",
        title: "Arma un prompt de nivel profesional.",
        intro: "Elige los ingredientes de un prompt de Copilot confiable. Deja fuera lo que lo debilita.",
        scene: {
          speaker: "MAYA",
          role: "COORDINADORA DE OPERACIONES",
          bubble: "Armemos uno como se debe, los cuatro diales. ¿Qué entra?",
          caption: "Rol, contexto, restricciones, ejemplo. Y para ahí.",
          location: opsDesk,
        },
        parts: [
          {
            id: "role",
            label: "Rol",
            text: "Eres un analista de operaciones que escribe para el gerente de turno.",
            good: true,
            why: "Fija experiencia, audiencia y tono en una línea.",
          },
          {
            id: "source",
            label: "Contexto anclado",
            text: "Basa tu respuesta solo en este informe aprobado: [pega].",
            good: true,
            why: "Ancla al modelo en material fuente real y seguro.",
          },
          {
            id: "format",
            label: "Restricciones + formato",
            text: "Devuelve una tabla de 3 filas: tema, impacto, acción recomendada. Menos de 150 palabras.",
            good: true,
            why: "Una forma precisa hace el resultado usable al instante.",
          },
          {
            id: "example",
            label: "Ejemplo (few-shot)",
            text: "Fila de ejemplo: “Personal | 2 vuelos demorados | sumar un agente de puerta.”",
            good: true,
            why: "Una muestra guía al modelo mejor que un párrafo de reglas.",
          },
          {
            id: "flattery",
            label: "Halagos",
            text: "¡Eres un genio increíble, el mejor analista de la historia!",
            good: false,
            why: "Los halagos no mejoran el resultado. La especificidad sí.",
          },
          {
            id: "dump",
            label: "Datos de más",
            text: "También aquí está la base de datos completa de clientes, por si acaso.",
            good: false,
            why: "Nunca agregues datos sensibles “por si acaso.” Mínimo necesario, siempre.",
          },
        ],
        correctFeedback:
          "Ese es un prompt profesional: rol, contexto anclado, restricciones con formato, y un ejemplo trabajado. Sin halagos, sin volcar datos.",
        incorrectFeedback:
          "Conserva los cuatro diales (rol, contexto anclado, restricciones/formato, ejemplo) y suelta lo que agrega halagos o datos innecesarios.",
      },
      {
        id: "cot-iterate",
        kind: "lesson",
        label: "Sube de nivel",
        title: "Dos jugadas pro: razonar e iterar",
        intro: "Cuando sube lo que está en juego, pídele que muestre su trabajo y luego dirígelo.",
        scene: {
          speaker: "JORDAN",
          role: "LÍDER DE ATENCIÓN AL CLIENTE",
          bubble: "La primera respuesta está cerca pero no bien. ¿Empiezo de cero?",
          caption: "Nunca reinicies. Dirige.",
          location: briefingRoom,
        },
        beats: [
          {
            icon: "🪜",
            title: "Pídele que razone paso a paso",
            copy: "Para cualquier cosa con lógica o números, agrega “piénsalo paso a paso.” Ves el razonamiento, así que atrapas un giro equivocado.",
          },
          {
            icon: "🔦",
            title: "Pide suposiciones y confianza",
            copy: "“Lista tus suposiciones y di de qué dudas.” Las conjeturas ocultas se vuelven visibles, y sabes exactamente dónde verificar.",
          },
          {
            icon: "🔁",
            title: "Itera, no reinicies",
            copy: "“Más corto.” “Más formal.” “Enfócate en el impacto de seguridad.” El segundo y tercer prompt es donde nacen las grandes respuestas.",
          },
        ],
      },
    ],
  },
  {
    id: "adv-grounding",
    number: 2,
    title: "Ánclalo en tus documentos",
    shortTitle: "Anclaje y Copilot",
    kicker: "ANCLAJE",
    description:
      "La mayor mejora de confiabilidad: alimenta a Copilot con tu material fuente real y aprobado, y úsalo dentro de las apps de Microsoft en las que ya trabajas.",
    minutes: 4,
    rule: "Anclado le gana a adivinado.",
    ruleDetail:
      "Una respuesta construida desde un documento que le diste es mucho más confiable que una de memoria. Apunta a Copilot a fuentes aprobadas y pídele que las cite.",
    steps: [
      {
        id: "why-ground",
        kind: "lesson",
        label: "Aprende",
        title: "Por qué el anclaje lo cambia todo",
        intro: "La mayoría de las alucinaciones vienen de un modelo respondiendo sin fuente. El anclaje lo arregla de raíz.",
        scene: {
          speaker: "MAYA",
          role: "COORDINADORA DE OPERACIONES",
          bubble: "¿Cómo hago que Copilot deje de inventar cosas?",
          caption: "Dale algo real sobre lo que pararse.",
          location: briefingRoom,
        },
        beats: [
          {
            icon: "📎",
            title: "Aliméntalo con la fuente",
            copy: "“Basándote solo en este documento…” ancla la respuesta a material real. No puede inventar lo que se le dice que respete.",
          },
          {
            icon: "🔗",
            title: "Pídele que cite la sección",
            copy: "“Cita la línea exacta que usaste.” Ahora cada afirmación es rastreable, y una inventada no tiene dónde esconderse.",
          },
          {
            icon: "🏢",
            title: "Copilot trabaja en tus archivos, con seguridad",
            copy: "En DASI, Copilot puede anclarse en tus documentos aprobados dentro del tenant de Microsoft, así el anclaje y la seguridad de datos van juntos.",
          },
          {
            icon: "🚧",
            title: "Ponle cerca",
            copy: "“No agregues datos externos. Si no está en el documento, dilo.” Una frase, y muchos menos detalles inventados.",
          },
        ],
      },
      {
        id: "grounded-or-not",
        kind: "multi",
        label: "Marca",
        dimension: "verification",
        title: "Marca cada prompt que esté bien anclado.",
        intro: "Los prompts anclados apuntan a una fuente real y encierran al modelo. Marca esos.",
        scene: {
          speaker: "JORDAN",
          role: "LÍDER DE ATENCIÓN AL CLIENTE",
          bubble: "¿Cuáles de estos se mantendrán de verdad anclados a la verdad?",
          caption: "Fuente + límite = anclado.",
          location: opsDesk,
        },
        boardLabel: "REVISIÓN DE PROMPTS",
        boardTitle: "Marca los prompts anclados",
        selectedTag: "ANCLADO",
        checkLabel: "Revisar mis marcas",
        items: [
          { id: "based-on", text: "“Basándote solo en este SOP [pega], lista los 5 pasos.”", tag: "Prompt", shouldSelect: true },
          { id: "cite", text: "“Resume este informe y cita la línea de cada afirmación.”", tag: "Prompt", shouldSelect: true },
          { id: "memory", text: "“Por lo que sabes, ¿cuál es nuestra política de reembolsos?”", tag: "Prompt", shouldSelect: false },
          { id: "fence", text: "“Usando solo el documento adjunto, y di si falta información.”", tag: "Prompt", shouldSelect: true },
          { id: "vague", text: "“Escribe algo sobre nuestras reglas de seguridad.”", tag: "Prompt", shouldSelect: false },
        ],
        correctFeedback:
          "Exacto. Los prompts anclados nombran una fuente real y encierran al modelo. “Por lo que sabes” y las peticiones vagas invitan a inventar.",
        incorrectFeedback:
          "Busca una fuente nombrada más un límite. “Por lo que sabes” y “escribe algo sobre…” no están anclados, así que son los riesgosos.",
      },
      {
        id: "trust-source",
        kind: "choice",
        label: "Juzga",
        dimension: "verification",
        title: "Dos números, dos orígenes. ¿En cuál confías?",
        intro: "Copilot dio una cifra de dos formas. Solo una está anclada.",
        scene: {
          speaker: "PRIYA",
          role: "GERENTE DE TURNO",
          bubble: "Una respuesta cita nuestro informe, la otra solo dice un número. ¿Cuál va en el briefing?",
          caption: "Rastreable le gana a confiado.",
          location: briefingRoom,
        },
        choices: [
          {
            id: "memory-num",
            label: "El número confiado sin fuente",
            detail: "Dijo “la puntualidad fue 88%” sin referencia.",
            correct: false,
            coach:
              "Un número sin fuente es una suposición de traje. Aunque sea correcto, no lo puedes defender. Nunca envíes una cifra sin fuente a la dirección.",
          },
          {
            id: "cited-num",
            label: "El número citado de tu informe",
            detail: "Dijo “86%, según la línea 12 del informe semanal de operaciones.”",
            correct: true,
            coach:
              "Ese es. Es rastreable a una fuente aprobada que puedes abrir y verificar. Anclado y citable es el estándar para todo lo que importa.",
          },
          {
            id: "average",
            label: "Partir la diferencia en 87%",
            detail: "Promedia los dos por si acaso.",
            correct: false,
            coach:
              "Promediar un número con fuente y uno inventado solo lava la suposición. Usa la cifra rastreable, y verifícala contra el informe.",
          },
        ],
      },
      {
        id: "copilot-office",
        kind: "lesson",
        label: "Aplica",
        title: "Copilot donde ya trabajas",
        intro: "El anclaje brilla dentro de las apps de Microsoft. Mismas barandillas, victorias reales del día a día.",
        scene: {
          speaker: "MAYA",
          role: "COORDINADORA DE OPERACIONES",
          bubble: "Entonces, ¿dónde uso esto de verdad, día a día?",
          caption: "Las herramientas que ya tienes, potenciadas.",
          location: breakRoom,
        },
        beats: [
          {
            icon: "📄",
            title: "Word",
            copy: "“Redacta este aviso desde el informe de incidente adjunto.” Anclado en tu documento, en tu tenant, listo para revisar.",
          },
          {
            icon: "📊",
            title: "Excel",
            copy: "“Explica la tendencia de esta tabla y señala los valores atípicos.” Copilot analiza tus datos; tú verificas los números que importan.",
          },
          {
            icon: "📧",
            title: "Outlook + Teams",
            copy: "“Resume este hilo y lista las decisiones.” Hilos largos y reuniones se vuelven listas de acciones claras, con seguridad dentro de DASI.",
          },
        ],
      },
    ],
  },
  {
    id: "adv-verify",
    number: 3,
    title: "Verifica como un profesional",
    shortTitle: "Verificación pro",
    kicker: "VERIFICACIÓN PROFUNDA",
    description:
      "La verificación de principiante es un vistazo. La pro triangula fuentes, recalcula números y atrapa cadenas de citas inventadas antes de que lleguen a una decisión.",
    minutes: 4,
    rule: "Confía en la fuente oficial, no en el tono.",
    ruleDetail:
      "Para todo lo importante: encuentra la afirmación en una fuente independiente, rehaz el cálculo tú mismo, y trata como falsa cualquier cita que no puedas abrir.",
    steps: [
      {
        id: "pro-checks",
        kind: "lesson",
        label: "Aprende",
        title: "El kit de verificación del profesional",
        intro: "Cuatro técnicas que atrapan los errores que una lectura rápida pierde.",
        scene: {
          speaker: "PRIYA",
          role: "GERENTE DE TURNO",
          bubble: "Un vistazo no basta para la presentación del directorio. ¿Qué hacen los profesionales de verdad?",
          caption: "Ajusta el rigor a lo que está en juego.",
          location: briefingRoom,
        },
        beats: [
          {
            icon: "🔺",
            title: "Triangula",
            copy: "Confirma la afirmación en una segunda fuente independiente. Una fuente puede fallar; dos que coinciden es confianza real.",
          },
          {
            icon: "🧮",
            title: "Recalcula",
            copy: "Nunca confíes en la aritmética de la IA en algo que importa. Rehaz la suma tú mismo, o en el sistema oficial.",
          },
          {
            icon: "🔗",
            title: "Abre cada cita",
            copy: "Haz clic. Si el estudio, la página o la política no se abren y no dicen lo que se afirma, trata toda la sección como sospechosa.",
          },
          {
            icon: "❓",
            title: "Interroga las suposiciones",
            copy: "Pregunta “¿qué supusiste y de qué dudas?” Las propias dudas del modelo te apuntan directo a los puntos débiles.",
          },
        ],
      },
      {
        id: "citation-chain",
        kind: "choice",
        label: "Atrápalo",
        dimension: "verification",
        title: "Una fuente cita una fuente que cita otra. Ninguna existe.",
        intro: "El informe parece meticulosamente referenciado. No puedes abrir un solo enlace.",
        scene: {
          speaker: "JORDAN",
          role: "LÍDER DE ATENCIÓN AL CLIENTE",
          bubble: "Tiene notas al pie y todo. Pero cada enlace da error 404. ¿Las notas lo salvan?",
          caption: "Las notas al pie no son evidencia. Las fuentes sí.",
          location: opsDesk,
        },
        choices: [
          {
            id: "trust-footnotes",
            label: "Consérvalo, las citas se ven rigurosas",
            detail: "Tanta referencia debe significar que es cuidadoso.",
            correct: false,
            coach:
              "Las cadenas de citas inventadas se ven más rigurosas que las reales, eso es lo que las hace peligrosas. Referencias que no abren son una alerta sobre todo el documento.",
          },
          {
            id: "rebuild",
            label: "Trátalo como no verificado y reconstruye desde fuentes reales",
            detail: "Descarta las referencias falsas; vuelve a buscar la fuente de cada afirmación que uses.",
            correct: true,
            coach:
              "Correcto. Una cadena de fuentes que no puedes abrir significa que las afirmaciones no están verificadas. Reconstruye la sección con referencias que sí puedas leer.",
          },
          {
            id: "ask-more",
            label: "Pídele a Copilot las citas completas",
            detail: "Probablemente puede llenar los detalles.",
            correct: false,
            coach:
              "Generará falsas aún más convincentes, con números de página. Los modelos redoblan cuando los presionas. Verifica fuera del chat.",
          },
        ],
      },
      {
        id: "verify-depth",
        kind: "sort",
        label: "Clasifica",
        dimension: "verification",
        title: "¿Con qué profundidad hay que revisar cada resultado?",
        intro: "Cinco resultados de IA, tres niveles de rigor. Coloca cada uno.",
        scene: {
          speaker: "PRIYA",
          role: "GERENTE DE TURNO",
          bubble: "Clasifica estos por cuánto verificamos antes de confiar en ellos.",
          caption: "Las consecuencias fijan el rigor.",
          location: briefingRoom,
        },
        buckets: ["Vistazo rápido", "Comprobar datos clave", "Experto + recalcular"],
        items: [
          {
            id: "brainstorm",
            text: "Lluvia interna de ideas de mejora de procesos",
            bucket: "Vistazo rápido",
            why: "Ideación sin consecuencias. Léela, elige las buenas.",
          },
          {
            id: "customer-faq",
            text: "Respuesta de FAQ para clientes sobre reembolsos",
            bucket: "Comprobar datos clave",
            why: "Los clientes actúan según ella. Verifica los detalles de política contra la fuente oficial.",
          },
          {
            id: "board-figs",
            text: "Cifras financieras para la presentación del directorio",
            bucket: "Experto + recalcular",
            why: "Números de alto impacto: recalcula desde el sistema financiero, con visto bueno de un experto.",
          },
          {
            id: "safety-proc",
            text: "Procedimiento de seguridad en rampa revisado",
            bucket: "Experto + recalcular",
            why: "Crítico para la seguridad: revisor calificado contra la fuente oficial, sin excepciones.",
          },
          {
            id: "meeting-notes",
            text: "Resumen de una reunión interna de planificación",
            bucket: "Comprobar datos clave",
            why: "Los colegas dependen de él: confirma que las decisiones y responsables sean correctos.",
          },
        ],
        correctFeedback:
          "Esa es la escalera bien usada. Invertiste tu rigor exactamente donde viven las consecuencias.",
        incorrectFeedback:
          "Recoloca algunos: las ideas sin consecuencias reciben un vistazo, lo que ven clientes o colegas se comprueba, y dinero o seguridad siempre lleva revisión experta y un recálculo.",
      },
    ],
  },
  {
    id: "adv-workflows",
    number: 4,
    title: "Diseña un flujo de trabajo con IA",
    shortTitle: "Flujos con IA",
    kicker: "TRABAJO REPETIBLE",
    description:
      "Deja de hacer prompts sueltos. Convierte una tarea recurrente en un flujo de Copilot seguro y repetible, con el punto de control humano en el lugar correcto.",
    minutes: 4,
    rule: "Manual, con IA, revisado, estandarizado.",
    ruleDetail:
      "Un buen flujo ancla a Copilot en insumos aprobados, usa una plantilla de prompt reutilizable, y mantiene una revisión humana antes de que algo salga o se repita.",
    steps: [
      {
        id: "workflow-shape",
        kind: "lesson",
        label: "Aprende",
        title: "La forma de un flujo de IA seguro",
        intro: "Cuatro etapas llevan una tarea de “lo hice una vez” a “el equipo lo hace de forma confiable.”",
        scene: {
          speaker: "MAYA",
          role: "COORDINADORA DE OPERACIONES",
          bubble: "Reescribo el mismo prompt cada semana. ¿Puedo hacer de esto un proceso real?",
          caption: "Prompt suelto, te presento el flujo repetible.",
          location: briefingRoom,
        },
        beats: [
          {
            icon: "✍️",
            title: "1. Manual",
            copy: "Haz la tarea a mano una vez y anota los pasos. No puedes automatizar lo que no puedes describir.",
          },
          {
            icon: "🤖",
            title: "2. Con IA",
            copy: "Suma Copilot donde es fuerte: redactar, resumir, estructurar. Ánclalo en tus insumos aprobados con una plantilla de prompt reutilizable.",
          },
          {
            icon: "🧑‍✈️",
            title: "3. Revisado",
            copy: "Pon un punto de control humano antes de que algo salga. El paso de revisión es lo que hace segura la velocidad.",
          },
          {
            icon: "📚",
            title: "4. Estandarizado",
            copy: "Guarda la plantilla y los pasos para que todo el equipo lo corra de la misma forma segura. Ahora escala.",
          },
        ],
      },
      {
        id: "build-workflow",
        kind: "builder",
        label: "Arma",
        dimension: "judgment",
        title: "Arma un flujo seguro de informe semanal.",
        intro: "Elige los pasos que lo hacen repetible y seguro. Deja fuera los atajos.",
        scene: {
          speaker: "MAYA",
          role: "COORDINADORA DE OPERACIONES",
          bubble: "Ayúdame a armar el resumen semanal de operaciones como un flujo en forma.",
          caption: "Ánclalo, plantíllalo, revísalo, estandarízalo.",
          location: opsDesk,
        },
        parts: [
          {
            id: "inputs",
            label: "Insumos definidos",
            text: "Toma los informes de operaciones aprobados de la semana como única fuente.",
            good: true,
            why: "Un insumo definido y aprobado mantiene el flujo anclado y seguro.",
          },
          {
            id: "template",
            label: "Plantilla de prompt",
            text: "Reutiliza un prompt guardado: rol, formato, barandilla de honestidad.",
            good: true,
            why: "Una plantilla guardada hace cada corrida consistente y confiable.",
          },
          {
            id: "review",
            label: "Revisión humana",
            text: "El gerente de turno revisa y aprueba antes de enviarlo.",
            good: true,
            why: "El punto de control que mantiene la velocidad responsable.",
          },
          {
            id: "standardize",
            label: "Estandarizar",
            text: "Documenta los pasos para que todo el equipo lo corra idéntico.",
            good: true,
            why: "Convierte un truco personal en un proceso de equipo confiable.",
          },
          {
            id: "autosend",
            label: "Envío automático",
            text: "Que Copilot envíe el resumen automáticamente, sin revisión.",
            good: false,
            why: "Quitar el punto de control humano es justo cómo un error de la IA llega a todos.",
          },
          {
            id: "personal",
            label: "Cuenta personal",
            text: "Córrelo en casa en un chatbot personal para ahorrar tiempo.",
            good: false,
            why: "Los datos de trabajo van en la herramienta aprobada en la cuenta de trabajo. Nunca en una cuenta personal.",
          },
        ],
        correctFeedback:
          "Ese es un flujo en el que puedes confiar: insumos aprobados, plantilla reutilizable, punto de control humano y pasos estandarizados. Sin envío automático, sin cuentas personales.",
        incorrectFeedback:
          "Conserva las cuatro piezas seguras (insumos definidos, plantilla de prompt, revisión humana, estandarizar) y suelta los atajos de envío automático y cuenta personal.",
      },
      {
        id: "over-automation",
        kind: "choice",
        label: "Juzga",
        dimension: "judgment",
        title: "Funciona tan bien que alguien sugiere quitar la revisión.",
        intro: "El flujo corrió limpio un mes. ¿Hora de cortar el punto de control?",
        scene: {
          speaker: "PRIYA",
          role: "GERENTE DE TURNO",
          bubble: "No ha fallado ni una vez. ¿Seguimos necesitando a una persona revisando cada semana?",
          caption: "El mes que funciona es el mes que conservas la revisión.",
          location: briefingRoom,
        },
        choices: [
          {
            id: "remove",
            label: "Quitar la revisión, ya está probado",
            detail: "Un mes limpio significa que es seguro automatizar del todo.",
            correct: false,
            coach:
              "Una racha limpia no elimina el riesgo, lo esconde. La única semana que aluciné una cifra, ya no hay nadie entre el error y la audiencia.",
          },
          {
            id: "keep",
            label: "Conservar el punto de control, quizá más ligero",
            detail: "Confía en el flujo, pero mantén un visto bueno humano antes de enviar.",
            correct: true,
            coach:
              "Correcto. Puedes agilizar la revisión conforme crece la confianza, pero una persona sigue siendo responsable de lo que sale. Esa es la línea que cruza la sobreautomatización.",
          },
          {
            id: "sometimes",
            label: "Revisar solo cuando se vea mal",
            detail: "Sáltate la revisión salvo que algo parezca raro.",
            correct: false,
            coach:
              "Los errores peligrosos son los que se ven bien, un número confiado y equivocado no “parecerá raro.” Justo por eso el control es siempre.",
          },
        ],
      },
    ],
  },
  {
    id: "adv-agents",
    number: 5,
    title: "Agentes y autonomía",
    shortTitle: "Agentes y supervisión",
    kicker: "IA AGÉNTICA",
    description:
      "La próxima ola de IA no solo responde, actúa. Aprende qué son los agentes, dónde van los puntos de aprobación, y cuánta autonomía conceder.",
    minutes: 4,
    rule: "Cuanto más puede hacer, más lo supervisas.",
    ruleDetail:
      "Los agentes toman acciones de varios pasos por ti. Ajusta la autonomía a lo que está en juego: lo de solo lectura y bajo riesgo puede correr libre; lo consecuente necesita una compuerta de aprobación humana.",
    steps: [
      {
        id: "what-agents",
        kind: "lesson",
        label: "Aprende",
        title: "De chatbot a agente",
        intro: "Un chatbot responde. Un agente actúa, y ese cambio transforma cómo lo supervisas.",
        scene: {
          speaker: "JORDAN",
          role: "LÍDER DE ATENCIÓN AL CLIENTE",
          bubble: "Todos dicen “agentes de IA.” ¿En qué se diferencia del chatbot que ya uso?",
          caption: "Responder es seguro. Actuar necesita una compuerta.",
          location: briefingRoom,
        },
        beats: [
          {
            icon: "🎯",
            title: "Un agente toma acciones",
            copy: "No solo redacta, puede hacer trabajo de varios pasos: extraer datos, llenar un formulario, enviar un mensaje, actualizar un registro, por ti.",
          },
          {
            icon: "🚦",
            title: "Puntos de aprobación",
            copy: "El control clave es una compuerta humana antes de acciones consecuentes. El agente propone; una persona aprueba antes de que actúe.",
          },
          {
            icon: "🆘",
            title: "Rutas de escalamiento",
            copy: "Un buen agente conoce sus límites y transfiere. Debe detenerse y preguntar al topar con algo sensible, ambiguo o de alto impacto.",
          },
          {
            icon: "🧾",
            title: "Supervisión y auditoría",
            copy: "Sigues siendo responsable de lo que un agente hace en tu nombre. Mantén un registro de lo que hizo, y revísalo, como tu propio trabajo.",
          },
        ],
      },
      {
        id: "agent-guardrail",
        kind: "choice",
        label: "Decide",
        dimension: "judgment",
        title: "Un agente ofrece enviar correos a clientes sobre demoras, automáticamente.",
        intro: "Puede detectar una demora y avisar a los clientes afectados sin humano en el circuito.",
        scene: {
          speaker: "PRIYA",
          role: "GERENTE DE TURNO",
          bubble: "Podría avisar a cada cliente afectado en segundos. ¿Lo dejamos enviar solo?",
          caption: "¿Acción hacia el cliente sin compuerta? Alarmas.",
          location: opsDesk,
        },
        choices: [
          {
            id: "full-auto",
            label: "Dejarlo enviar automáticamente",
            detail: "Es rápido y los mensajes suelen estar bien.",
            correct: false,
            coach:
              "Los mensajes a clientes llevan el nombre de la empresa y no se pueden deshacer. “Suelen estar bien” no es un estándar para acción autónoma. Esto necesita una compuerta.",
          },
          {
            id: "propose-approve",
            label: "Redacta, una persona aprueba el lote, luego envía",
            detail: "Conserva la velocidad; agrega una aprobación humana de un clic antes de que salga.",
            correct: true,
            coach:
              "Ese es el patrón: el agente hace el trabajo pesado, un humano aprueba la acción consecuente. Velocidad y responsabilidad juntas.",
          },
          {
            id: "ban",
            label: "Prohibir el agente por completo",
            detail: "Muy riesgoso, hazlo todo a mano.",
            correct: false,
            coach:
              "Sobrecorrección. Un agente bien controlado es más rápido e igual de seguro. La solución es un punto de aprobación, no abandonar la capacidad.",
          },
        ],
      },
      {
        id: "autonomy-sort",
        kind: "sort",
        label: "Clasifica",
        dimension: "safety",
        title: "¿Cuánta autonomía debe tener cada acción del agente?",
        intro: "Empareja cada acción con la supervisión que necesita.",
        scene: {
          speaker: "MAYA",
          role: "COORDINADORA DE OPERACIONES",
          bubble: "¿Cuáles de estas pueden correr solas, y cuáles necesitan una mano en el interruptor?",
          caption: "Solo lectura es fácil. Las acciones necesitan compuertas.",
          location: briefingRoom,
        },
        buckets: ["Corre libre", "Necesita aprobación", "Nunca autónomo"],
        items: [
          {
            id: "summarize",
            text: "Resumir los informes internos de hoy para ti",
            bucket: "Corre libre",
            why: "Solo lectura, interno, sin efecto externo. Déjalo correr; tú revisas el resumen.",
          },
          {
            id: "draft-reply",
            text: "Redactar (no enviar) una respuesta a cliente para tu revisión",
            bucket: "Corre libre",
            why: "Redactar es seguro, nada sale sin ti. Apruebas antes de enviar.",
          },
          {
            id: "send-customer",
            text: "Enviar mensajes a clientes",
            bucket: "Necesita aprobación",
            why: "Externo e irreversible. Un humano aprueba antes de que salga.",
          },
          {
            id: "refund",
            text: "Emitir reembolsos o mover dinero",
            bucket: "Nunca autónomo",
            why: "Las acciones financieras necesitan autorización humana siempre, sin excepciones.",
          },
          {
            id: "hr",
            text: "Decidir a quién contratar o sancionar",
            bucket: "Nunca autónomo",
            why: "Las decisiones consecuentes sobre personas nunca son del agente. Punto.",
          },
        ],
        correctFeedback:
          "Esa es autonomía calibrada: lo de solo lectura corre libre, las acciones externas llevan compuerta, y dinero o personas nunca son autónomos.",
        incorrectFeedback:
          "Reordena por reversibilidad y riesgo: solo lectura es libre, todo lo externo o irreversible necesita aprobación, y dinero o personas nunca son autónomos.",
      },
    ],
  },
  {
    id: "adv-govern",
    number: 6,
    title: "Lidera con IA",
    shortTitle: "Gobernar y escalar",
    kicker: "PRUEBA FINAL",
    description:
      "La prueba final avanzada: evalúa un caso de uso de IA con cuatro lentes, elige los controles correctos, y escala la IA en el equipo de forma responsable.",
    minutes: 5,
    rule: "Valor, riesgo, datos, supervisión.",
    ruleDetail:
      "Juzga cualquier uso de IA por su valor de negocio, su riesgo, la sensibilidad de los datos, y la supervisión humana requerida. Luego escala lo que pasa, con estándares.",
    steps: [
      {
        id: "four-lenses",
        kind: "lesson",
        label: "Aprende",
        title: "Cuatro lentes para cualquier caso de uso de IA",
        intro: "Los líderes no preguntan “¿puede la IA hacer esto?” Preguntan cuatro cosas más agudas.",
        scene: {
          speaker: "PRIYA",
          role: "GERENTE DE TURNO",
          bubble: "El equipo propone ideas de IA sin parar. ¿Cómo las juzgo de forma consistente?",
          caption: "Una rúbrica, cada propuesta.",
          location: briefingRoom,
        },
        beats: [
          {
            icon: "💰",
            title: "Valor de negocio",
            copy: "¿Qué ahorra o mejora esto de verdad? Si la ganancia es vaga, el esfuerzo y el riesgo casi nunca valen la pena.",
          },
          {
            icon: "⚠️",
            title: "Riesgo",
            copy: "¿Cuál es el daño si se equivoca, tiene sesgo o hay fuga? El bajo riesgo va suave; el alto riesgo lleva controles o un no.",
          },
          {
            icon: "🔐",
            title: "Sensibilidad de datos",
            copy: "¿Qué datos toca? Público e interno son más fáciles; datos confidenciales, personales o regulados suben mucho la vara.",
          },
          {
            icon: "🧑‍✈️",
            title: "Supervisión humana",
            copy: "¿Dónde está el punto de control humano, y alcanza para lo que está en juego? A mayor impacto, más cerca la supervisión.",
          },
        ],
      },
      {
        id: "evaluate-case",
        kind: "choice",
        label: "Evalúa",
        dimension: "judgment",
        title: "Un gerente quiere que Copilot clasifique candidatos. ¿Tu decisión?",
        intro: "Pásalo por las cuatro lentes antes de responder.",
        scene: {
          speaker: "JORDAN",
          role: "LÍDER DE ATENCIÓN AL CLIENTE",
          bubble: "Ahorraría horas de filtrado. Pero algo se siente raro. ¿Qué decimos?",
          caption: "Alto valor, alto riesgo, datos sensibles, supervisión débil.",
          location: opsDesk,
        },
        choices: [
          {
            id: "approve",
            label: "Aprobarlo, el ahorro de tiempo es enorme",
            detail: "El filtrado tarda una eternidad; que Copilot los clasifique.",
            correct: false,
            coach:
              "El valor es real, pero el riesgo y la sensibilidad de datos son altos y el sesgo es un peligro vivo. Clasificar candidatos es un uso de carril rojo, decisión sobre personas, no una ganancia de eficiencia.",
          },
          {
            id: "no-controls",
            label: "No: es una decisión sobre personas que necesita el proceso aprobado",
            detail: "La IA puede ayudar con logística, pero la evaluación sigue humana, en el proceso de contratación.",
            correct: true,
            coach:
              "Correcto. Las decisiones de empleo tienen riesgo legal y de equidad y tocan datos sensibles. La IA puede ayudar a agendar u organizar; el criterio se queda en tu proceso de contratación aprobado y humano.",
          },
          {
            id: "ask-ai-bias",
            label: "Que clasifique, y luego pedirle que revise su propio sesgo",
            detail: "Que Copilot audite su propia equidad.",
            correct: false,
            coach:
              "Un modelo auditando su propio sesgo no es supervisión independiente. Este caso falla las lentes de riesgo y supervisión, ningún autochequeo lo arregla.",
          },
        ],
      },
      {
        id: "pick-controls",
        kind: "multi",
        label: "Controla",
        dimension: "safety",
        title: "Un uso de riesgo medio pasa. Marca los controles que necesita.",
        intro: "Usar Copilot para redactar resúmenes de política para clientes. ¿Qué controles lo hacen seguro?",
        scene: {
          speaker: "PRIYA",
          role: "GERENTE DE TURNO",
          bubble: "Este vale la pena. ¿Qué barandillas le ponemos antes de que salga en vivo?",
          caption: "Los controles correctos convierten un quizá en un sí.",
          location: briefingRoom,
        },
        boardLabel: "CASO DE USO · RIESGO MEDIO",
        boardTitle: "Selecciona los controles que necesita",
        selectedTag: "REQUERIDO",
        checkLabel: "Revisar mis controles",
        items: [
          { id: "ground", text: "Anclar solo en los documentos de política aprobados", tag: "Control", shouldSelect: true },
          { id: "review", text: "Revisión humana antes de publicar cualquier cosa", tag: "Control", shouldSelect: true },
          { id: "approved-tool", text: "Usar Copilot en la cuenta de trabajo, no herramientas personales", tag: "Control", shouldSelect: true },
          { id: "auto-publish", text: "Autopublicar en el sitio web para ahorrar tiempo", tag: "Atajo", shouldSelect: false },
          { id: "no-log", text: "Saltarse el registro para ir más rápido", tag: "Atajo", shouldSelect: false },
        ],
        correctFeedback:
          "Buen conjunto de controles: anclado en fuentes aprobadas, revisión humana antes de publicar, y la herramienta aprobada. Sin autopublicar, sin saltarse el registro.",
        incorrectFeedback:
          "Conserva los controles reales (anclaje, revisión humana, herramienta aprobada) y suelta los atajos, autopublicar y saltarse registros derrota el propósito.",
      },
      {
        id: "scale-it",
        kind: "choice",
        label: "Escala",
        dimension: "judgment",
        title: "Decisión final: ¿cómo llevas un flujo de IA ganador a todo el equipo?",
        intro: "El flujo de Copilot de un equipo es un éxito. Hora de escalarlo con responsabilidad.",
        scene: {
          speaker: "PRIYA",
          role: "GERENTE DE TURNO",
          bubble: "Funciona genial en un equipo. ¿Cómo lo llevamos a toda la empresa sin que se descarrile?",
          caption: "Escala los estándares, no solo la herramienta.",
          location: briefingRoom,
        },
        choices: [
          {
            id: "mandate",
            label: "Imponerlo en todas partes de inmediato",
            detail: "Empújalo a cada equipo esta semana.",
            correct: false,
            coach:
              "Escalar sin estándares también propaga los errores. Un despliegue apurado sin plantillas ni capacitación convierte la victoria de un equipo en el riesgo de todos.",
          },
          {
            id: "standards",
            label: "Compartir la plantilla, formar campeones, medir la adopción",
            detail: "Empaqueta la plantilla de prompt y los pasos de revisión, forma unos campeones por equipo, y mide cómo se usa.",
            correct: true,
            coach:
              "Así escala la IA con seguridad: plantillas estandarizadas, campeones formados que difunden buenos hábitos, y medición para detectar problemas temprano y probar el valor.",
          },
          {
            id: "leave",
            label: "Dejarlo solo con ese equipo",
            detail: "Ahí funciona; no arriesgues nada cambiando.",
            correct: false,
            coach:
              "Acaparar una victoria probada tiene su propio costo. La jugada no es evitar escalar, es escalar con estándares, campeones y medición.",
          },
        ],
      },
    ],
  },
];

export const advancedFieldGuideEs: GuideCard[] = [
  {
    id: "four-dials",
    icon: "🎛️",
    title: "Los cuatro diales del prompt",
    subtitle: "Prompting de nivel pro",
    lines: [
      "ROL: “Eres un [rol] que escribe para [audiencia].”",
      "CONTEXTO: pega el material fuente real y aprobado.",
      "RESTRICCIONES + FORMATO: longitud, tono y la forma exacta.",
      "EJEMPLO: muestra una buena muestra; el modelo la imita.",
      "Luego razona paso a paso, pide suposiciones e itera.",
    ],
  },
  {
    id: "grounding",
    icon: "📎",
    title: "Lista de anclaje",
    subtitle: "Hazlo confiable",
    lines: [
      "“Basándote solo en este documento…” ancla la respuesta.",
      "“Cita la línea exacta que usaste” hace rastreables las afirmaciones.",
      "“Si no está en la fuente, dilo” cierra la puerta a inventar.",
      "Ancla Copilot en archivos aprobados dentro del tenant de DASI.",
    ],
  },
  {
    id: "verify-pro",
    icon: "🔺",
    title: "Verificación pro",
    subtitle: "Proporcional al impacto",
    lines: [
      "Triangula: confirma en una segunda fuente independiente.",
      "Recalcula tú mismo cada número que importa.",
      "Abre cada cita; si no puedes, trátala como falsa.",
      "Pregunta: “¿qué supusiste y de qué dudas?”",
    ],
  },
  {
    id: "workflow",
    icon: "⚙️",
    title: "Flujo de IA seguro",
    subtitle: "Repetible y revisado",
    lines: [
      "Manual → Con IA → Revisado → Estandarizado.",
      "Ancla en insumos aprobados; reutiliza una plantilla de prompt.",
      "Mantén un punto de control humano antes de que algo salga.",
      "Nunca envío automático; nunca cuenta personal para el trabajo.",
    ],
  },
  {
    id: "agents",
    icon: "🤖",
    title: "Autonomía de agentes",
    subtitle: "Ajusta el control al riesgo",
    lines: [
      "Solo lectura, interno: puede correr libre (tú revisas).",
      "Acciones externas o irreversibles: compuerta de aprobación humana.",
      "Dinero y decisiones sobre personas: nunca autónomo.",
      "Mantén un registro de auditoría; respondes por lo que hace en tu nombre.",
    ],
  },
  {
    id: "govern",
    icon: "⚖️",
    title: "Evalúa cualquier caso de uso",
    subtitle: "Cuatro lentes para liderar",
    lines: [
      "VALOR: ¿qué ahorra o mejora de verdad?",
      "RIESGO: ¿cuál es el daño si se equivoca o hay fuga?",
      "DATOS: ¿qué tan sensibles son los datos que toca?",
      "SUPERVISIÓN: ¿alcanza el control humano para lo que está en juego?",
      "Escala a los ganadores con plantillas, campeones y medición.",
    ],
  },
];
