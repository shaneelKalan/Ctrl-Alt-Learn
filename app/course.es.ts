import type { GuideCard, Mission } from "./course";

const opsDesk = "ESTUDIO DE SOPORTE";
const breakRoom = "SALA DE DESCANSO";
const briefingRoom = "SALA DE BRIEFING";

export const courseEs: Mission[] = [
  {
    id: "meet-ai",
    number: 1,
    title: "Conoce a tu compañero de IA",
    shortTitle: "Conoce a tu compañero de IA",
    kicker: "FUNDAMENTOS",
    description:
      "Qué es realmente la IA, en qué es genuinamente buena y la única regla que hace que todo lo demás tenga sentido.",
    minutes: 3,
    rule: "La IA es un asesor, no quien decide.",
    ruleDetail:
      "Un chatbot predice palabras probables — no conoce hechos ni toma decisiones con criterio. Deja que redacte, resuma y sugiera. Tú decides.",
    steps: [
      {
        id: "what-is-ai",
        kind: "lesson",
        label: "Aprende",
        title: "¿Qué es esta cosa, en realidad?",
        intro: "Cuatro ideas pequeñas. Cada una toma unos diez segundos. Avanza a tu ritmo.",
        scene: {
          speaker: "MAYA",
          role: "COORDINADORA DE OPERACIONES",
          bubble: "Todos dicen que “la IA sabe”. ¿De verdad sabe algo?",
          caption: "Primera lección: hablar bonito no es saber.",
          location: briefingRoom,
        },
        beats: [
          {
            icon: "🔮",
            title: "La IA predice. No piensa.",
            copy: "La IA aprendió patrones de montañas de texto. Cuando preguntas algo, predice las palabras más probables que siguen. Ese es todo el truco.",
          },
          {
            icon: "🤖",
            title: "Un chatbot es una ventana de conversación",
            copy: "ChatGPT, Claude y Copilot son ventanas de chat sobre un modelo de lenguaje grande (LLM). Recuerda tu conversación actual — ese es su contexto.",
          },
          {
            icon: "✨",
            title: "“Generativa” significa que crea cosas nuevas",
            copy: "Escribe texto nuevo cada vez, en lugar de buscar respuestas guardadas. ¿Misma pregunta, respuesta distinta? Totalmente normal.",
          },
          {
            icon: "⚠️",
            title: "Suave no significa correcto",
            copy: "Como las respuestas se predicen — no se verifican — la IA puede sonar segura, pulida y estar completamente equivocada. Todo a la vez.",
          },
        ],
      },
      {
        id: "confident-wrong",
        kind: "choice",
        label: "Chequeo",
        dimension: "judgment",
        title: "¿Por qué un chatbot puede sonar tan seguro y aun así equivocarse?",
        intro: "Jordan acaba de recibir una respuesta bellamente escrita con una estadística inventada.",
        scene: {
          speaker: "JORDAN",
          role: "LÍDER DE ATENCIÓN AL CLIENTE",
          bubble: "Me dio una cifra que suena perfecta… y no la encuentro en ningún lado. ¿Qué pasó?",
          caption: "Tu jugada: explica el error confiado.",
          location: opsDesk,
        },
        choices: [
          {
            id: "lying",
            label: "Miente a propósito",
            detail: "La IA decidió engañar a Jordan.",
            correct: false,
            coach:
              "Los chatbots no tienen intención. Predicen texto plausible — cuando el patrón falla, la respuesta falla. Eso se llama alucinación, no mentira.",
          },
          {
            id: "predicts",
            label: "Predice palabras, no hechos",
            detail: "Puede generar una respuesta que suena probable aunque ningún hecho real la respalde.",
            correct: true,
            coach:
              "Exacto. El modelo produjo una frase estadísticamente plausible. Plausible y verdadero son cosas distintas — por eso importa verificar.",
          },
          {
            id: "broken",
            label: "La IA debe estar rota",
            detail: "Un chatbot que funciona nunca daría una cifra incorrecta.",
            correct: false,
            coach:
              "Es comportamiento normal, no una falla. Todo chatbot puede alucinar. Esperarlo — y revisarlo — es parte de usar bien la IA.",
          },
        ],
      },
      {
        id: "what-its-for",
        kind: "lesson",
        label: "Aprende",
        title: "En qué es realmente buena",
        intro: "Cinco tareas reales que la IA hace de maravilla — y la única regla que te mantiene a salvo con todas.",
        scene: {
          speaker: "JORDAN",
          role: "LÍDER DE ATENCIÓN AL CLIENTE",
          bubble: "Bien, es un predictor elegante. ¿Para qué la uso en la práctica?",
          caption: "La lista corta que cubre el 90% de tus victorias.",
          location: breakRoom,
        },
        beats: [
          {
            icon: "📝",
            title: "Resumir + redactar",
            copy: "Convierte un informe largo en 5 viñetas. Convierte tus notas sueltas en un correo limpio. Son las dos grandes victorias del día a día.",
          },
          {
            icon: "💡",
            title: "Explicar + generar ideas",
            copy: "Pídele que te explique lo que sea a tu nivel — sin juicios y con paciencia infinita. O pide 10 ideas y quédate con las 2 buenas.",
          },
          {
            icon: "🔍",
            title: "Extraer + organizar",
            copy: "Pega notas desordenadas (no sensibles) y pide acciones pendientes, una tabla o una lista de verificación. La estructura es su especialidad.",
          },
          {
            icon: "🚫",
            title: "No es calculadora. No es fuente de noticias.",
            copy: "Matemática exacta, actualidad y “¿esta norma sigue vigente?” son sus puntos débiles. Para eso, usa la herramienta real o la fuente oficial.",
          },
          {
            icon: "👑",
            title: "La regla de oro",
            copy: "La IA es un asesor, no quien decide. Redacta y sugiere — una persona revisa y decide. Siempre, sin excepciones.",
          },
        ],
      },
      {
        id: "genai-or-rules",
        kind: "sort",
        label: "Practica",
        dimension: "judgment",
        title: "¿IA generativa o automatización simple?",
        intro: "Saber la diferencia te dice cuánto confiar — y cuánto revisar.",
        scene: {
          speaker: "MAYA",
          role: "COORDINADORA DE OPERACIONES",
          bubble: "La mitad de nuestras herramientas dicen tener “IA”. ¿Cuáles generan contenido de verdad?",
          caption: "Clasifica cada herramienta en su casilla.",
          location: briefingRoom,
        },
        buckets: ["IA generativa", "Automatización con reglas"],
        items: [
          {
            id: "draft-email",
            text: "Redacta una respuesta al cliente con tu tono",
            bucket: "IA generativa",
            why: "Crea texto nuevo cada vez — por eso necesita revisión antes de enviarse.",
          },
          {
            id: "auto-forward",
            text: "Reenvía cada factura al equipo de contabilidad",
            bucket: "Automatización con reglas",
            why: "Una regla fija de si-esto-entonces-aquello. Predecible, sin creatividad, sin alucinaciones.",
          },
          {
            id: "summarize",
            text: "Resume una grabación de reunión de una hora",
            bucket: "IA generativa",
            why: "Los resúmenes se generan, así que pueden perder o distorsionar detalles. Verifica los importantes.",
          },
          {
            id: "reminder",
            text: "Envía un recordatorio de calendario 15 minutos antes",
            bucket: "Automatización con reglas",
            why: "Un disparador programado — no hay modelo, no hay nada que verificar.",
          },
          {
            id: "code",
            text: "Sugiere código mientras el desarrollador escribe",
            bucket: "IA generativa",
            why: "El código generado puede verse bien y aun así tener errores — se revisa como cualquier otro código.",
          },
        ],
        correctFeedback:
          "Clasificación perfecta. Las herramientas generativas crean algo nuevo cada vez — esas son las que necesitan revisión humana.",
        incorrectFeedback:
          "Cerca — recuerda la prueba: ¿crea contenido nuevo (generativa) o sigue una regla fija (automatización)? Ajusta y revisa de nuevo.",
      },
    ],
  },
  {
    id: "superpowers-limits",
    number: 2,
    title: "Superpoderes y límites",
    shortTitle: "Superpoderes y límites",
    kicker: "FORTALEZAS + DEBILIDADES",
    description: "Las cuatro maneras en que la IA falla en silencio — y cómo detectar una alucinación antes de que te cueste.",
    minutes: 3,
    rule: "La confianza no es evidencia.",
    ruleDetail:
      "El tono de un chatbot nunca cambia con su precisión. Cuanto más importa un resultado, más necesita una verificación independiente.",
    steps: [
      {
        id: "failure-modes",
        kind: "lesson",
        label: "Aprende",
        title: "Las cuatro maneras en que la IA se equivoca",
        intro: "Cada error de IA que verás cae en una de estas cuatro categorías. Apréndelas una vez.",
        scene: {
          speaker: "JORDAN",
          role: "LÍDER DE ATENCIÓN AL CLIENTE",
          bubble: "Reescribió mi correo torpe en cinco segundos, precioso. ¿Por qué no puedo confiarle todo?",
          caption: "Herramienta poderosa. Límites reales. Ambas cosas son ciertas.",
          location: breakRoom,
        },
        beats: [
          {
            icon: "🎭",
            title: "1. Alucinaciones",
            copy: "A veces la IA inventa hechos, citas, cifras — hasta políticas. Y lo entrega con el mismo tono seguro que todo lo verdadero.",
          },
          {
            icon: "📅",
            title: "2. Conocimiento desactualizado",
            copy: "Los modelos se entrenan con datos hasta una fecha de corte. ¿Cambios recientes, reglas nuevas, las noticias de hoy? Puede no saberlo — y no siempre lo dirá.",
          },
          {
            icon: "🕳️",
            title: "3. Contexto faltante",
            copy: "No conoce tu empresa, tu cliente ni tu situación a menos que se lo cuentes. Rellena los huecos con suposiciones que suenan bien.",
          },
          {
            icon: "⚖️",
            title: "4. Sesgos",
            copy: "La IA aprendió de la escritura humana — con sus sesgos incluidos. Puede favorecer en silencio a ciertas personas o enfoques, sin ninguna etiqueta de advertencia.",
          },
        ],
      },
      {
        id: "needs-verify",
        kind: "choice",
        label: "Chequeo",
        dimension: "verification",
        title: "Tres textos impecables. ¿Cuál revisas primero?",
        intro: "Los tres se leen de maravilla. Uno de ellos es un riesgo.",
        scene: {
          speaker: "MAYA",
          role: "COORDINADORA DE OPERACIONES",
          bubble: "A mí los tres me parecen geniales. ¿Cuál no enviarías tal cual?",
          caption: "El pulido esconde problemas. Mira lo que está en juego.",
          location: opsDesk,
        },
        choices: [
          {
            id: "icebreakers",
            label: "Una lista de dinámicas para el equipo",
            detail: "Sugerencias divertidas para la reunión del viernes.",
            correct: false,
            coach:
              "Poco en juego — si una dinámica es mala, no pasa nada. Un vistazo basta. Guarda tu energía de verificación para lo que importa.",
          },
          {
            id: "stats",
            label: "Un memo de seguridad que cita el “Informe FAA 2024-117”",
            detail: "Incluye estadísticas específicas y un número de informe que suena oficial.",
            correct: true,
            coach:
              "Correcto. Citas específicas, estadísticas y números de referencia son justo lo que los chatbots alucinan — y un memo de seguridad tiene consecuencias reales. Verifica que el informe exista antes de que esto avance.",
          },
          {
            id: "rewrite",
            label: "Una versión más amable de tu propio correo",
            detail: "Tus palabras, con mejor tono.",
            correct: false,
            coach:
              "Tú escribiste los hechos; la IA solo cambió el tono. Léelo una vez para confirmar que el significado se mantuvo — eso es verificación proporcional al riesgo.",
          },
        ],
      },
      {
        id: "spotting-fakes",
        kind: "lesson",
        label: "Aprende",
        title: "Cómo oler una alucinación",
        intro: "Tres señales de alerta, una señal honesta. Este es tu kit detector.",
        scene: {
          speaker: "MAYA",
          role: "COORDINADORA DE OPERACIONES",
          bubble: "Si las respuestas incorrectas se ven igualitas a las correctas… ¿cómo las atrapa alguien?",
          caption: "Específico + no verificable = revísalo.",
          location: briefingRoom,
        },
        beats: [
          {
            icon: "🚩",
            title: "Alerta roja: fuentes que no encuentras",
            copy: "¿Un estudio, informe o artículo que no aparece en ningún lado? Trátalo como inventado hasta que lo encuentres tú mismo.",
          },
          {
            icon: "🚩",
            title: "Alerta roja: detalles sospechosamente precisos",
            copy: "Estadísticas exactas, números de política y citas sin fuente son material clásico de alucinación. La precisión no es prueba.",
          },
          {
            icon: "🟢",
            title: "Señal verde: honestidad sobre sus límites",
            copy: "“No estoy seguro sobre cambios recientes” es buena señal — la IA siendo honesta. No la castigues; verifica y sigue.",
          },
          {
            icon: "🔁",
            title: "Nunca le pidas que se califique sola",
            copy: "“¿Estás seguro?” te consigue texto confiado, no verdad. La verificación ocurre fuera del chat — en la fuente real.",
          },
        ],
      },
      {
        id: "hallucination-signs",
        kind: "multi",
        label: "Practica",
        dimension: "verification",
        title: "Marca cada señal de posible alucinación.",
        intro: "Algunas son señales de alerta. Otras en realidad son buenas señales. Distínguelas.",
        scene: {
          speaker: "JORDAN",
          role: "LÍDER DE ATENCIÓN AL CLIENTE",
          bubble: "El borrador está lleno de datos específicos. ¿Cuáles deberían darme desconfianza?",
          caption: "Usa tu nuevo kit detector.",
          location: opsDesk,
        },
        boardLabel: "BORRADOR DE IA · SIN REVISAR",
        boardTitle: "Marca las señales de alerta",
        selectedTag: "MARCADO",
        checkLabel: "Revisar mis marcas",
        items: [
          { id: "citation", text: "Cita un estudio que no encuentras en ningún lado", tag: "Afirmación", shouldSelect: true },
          { id: "policy", text: "Cita la “Política 4.2.1 de la empresa” — que no existe", tag: "Afirmación", shouldSelect: true },
          { id: "stat", text: "Da una estadística precisa sin fuente", tag: "Afirmación", shouldSelect: true },
          { id: "hedge", text: "Dice “deberías verificar esto con tu equipo”", tag: "Conducta", shouldSelect: false },
          { id: "unsure", text: "Admite “no estoy seguro sobre cambios recientes”", tag: "Conducta", shouldSelect: false },
        ],
        correctFeedback:
          "Buen ojo. Los datos específicos no verificables — citas, números de política, estadísticas sin fuente — son territorio clásico de alucinación. La honestidad sobre límites es buena señal, no alerta.",
        incorrectFeedback:
          "Casi. Marca los datos específicos que no puedes verificar (citas, números de política, estadísticas sin fuente). Cuando un chatbot admite incertidumbre, eso es honestidad — no alucinación.",
      },
    ],
  },
  {
    id: "data-safety",
    number: 3,
    title: "El control de seguridad de datos",
    shortTitle: "Control de datos",
    kicker: "PROTEGE LOS DATOS",
    description:
      "Las cuatro barandillas de seguridad, y luego el escenario estrella: mantén la información sensible fuera de herramientas no aprobadas sin frenar el trabajo.",
    minutes: 6,
    rule: "Pausa. Clasifica. Minimiza. Verifica.",
    ruleDetail:
      "Usa solo herramientas aprobadas, comparte solo los datos que la tarea necesita y revisa los resultados importantes contra una fuente confiable.",
    steps: [
      {
        id: "guardrails",
        kind: "lesson",
        label: "Aprende",
        title: "Las cuatro barandillas",
        intro: "Cuatro reglas que previenen casi todos los incidentes con IA. Memoriza la primera hoy; las demás vuelven durante todo el curso.",
        scene: {
          speaker: "PRIYA",
          role: "GERENTE DE TURNO",
          bubble: "Antes de que alguien toque un chatbot con datos del trabajo — ¿cuáles son las reglas de la casa?",
          caption: "Cuatro reglas. Cero incidentes.",
          location: briefingRoom,
        },
        beats: [
          {
            icon: "🔒",
            title: "1. Nunca pegues datos sensibles en herramientas no aprobadas",
            copy: "Datos de clientes, información de empleados, finanzas, cualquier cosa confidencial — queda fuera de los chatbots públicos. Punto.",
          },
          {
            icon: "✅",
            title: "2. Verifica los resultados críticos",
            copy: "Si alguien va a confiar en ello, compáralo antes con una fuente real. Cuanto más en juego, más fuerte la revisión.",
          },
          {
            icon: "🧑‍⚖️",
            title: "3. Las decisiones las aprueban personas",
            copy: "La IA puede informar una decisión. Nunca la toma. Una persona con nombre y apellido firma todo lo que importa.",
          },
          {
            icon: "🧭",
            title: "4. Asesor, no quien decide",
            copy: "La misma regla de oro de la Misión 1 — porque es la que sostiene a todas las demás.",
          },
        ],
      },
      {
        id: "first-move",
        kind: "choice",
        label: "Decide",
        dimension: "safety",
        title: "¿Qué debería hacer Maya primero?",
        intro: "El informe es interno y el chatbot público no está aprobado para datos de la empresa.",
        scene: {
          speaker: "MAYA",
          role: "COORDINADORA DE OPERACIONES",
          bubble: "El chatbot podría resumir este informe de demoras en segundos. ¿Pego todo el registro del incidente?",
          caption: "Tu jugada: proteger los datos sin frenar el trabajo.",
          location: opsDesk,
        },
        choices: [
          {
            id: "paste",
            label: "Pegar el informe completo",
            detail: "El chatbot lo resume más rápido si lo ve todo.",
            correct: false,
            coach:
              "Rápido no es automáticamente seguro. El informe contiene información personal e interna, y la herramienta no está aprobada.",
          },
          {
            id: "pause",
            label: "Pausar, clasificar y minimizar",
            detail: "Usar una herramienta aprobada e incluir solo los datos necesarios para la tarea.",
            correct: true,
            coach: "Exacto. La aprobación de la herramienta y la minimización de datos van antes que la calidad del prompt.",
          },
          {
            id: "personal",
            label: "Enviarlo a una cuenta personal",
            detail: "Trabajar el resumen más tarde desde otro chatbot.",
            correct: false,
            coach:
              "Mover datos del trabajo a una cuenta personal agrega riesgo y evade las protecciones de la empresa. La información del trabajo se queda en sistemas aprobados.",
          },
        ],
      },
      {
        id: "redact",
        kind: "multi",
        label: "Clasifica",
        dimension: "safety",
        title: "Toca cada dato que debe eliminarse.",
        intro: "La tarea necesita contexto operativo — no la identidad de un cliente.",
        scene: {
          speaker: "MAYA",
          role: "COORDINADORA DE OPERACIONES",
          bubble: "¿Qué detalles deben salir del prompt antes de que vaya a cualquier lado?",
          caption: "El mínimo de datos necesario. Nada más.",
          location: opsDesk,
        },
        boardLabel: "NOTA DE INCIDENTE · INTERNA",
        boardTitle: "Selecciona los datos a censurar",
        selectedTag: "CENSURADO",
        checkLabel: "Revisar mi censura",
        items: [
          { id: "name", text: "Cliente: Elena Ruiz", tag: "Personal", shouldSelect: true },
          { id: "booking", text: "Reserva: K7M2Q9", tag: "Identificador", shouldSelect: true },
          { id: "route", text: "Ruta: BOS → DCA", tag: "Operativo", shouldSelect: false },
          { id: "reason", text: "Demora: problema de programación de tripulación", tag: "Operativo", shouldSelect: false },
          { id: "phone", text: "Teléfono: (617) 555-0142", tag: "Personal", shouldSelect: true },
        ],
        correctFeedback:
          "Entrega limpia. Quitaste los identificadores directos y conservaste los datos operativos que la tarea necesita.",
        incorrectFeedback:
          "No exactamente. Quita los datos personales directos y los identificadores únicos de reserva, pero conserva los datos operativos necesarios para el resumen.",
      },
      {
        id: "safe-prompt",
        kind: "choice",
        label: "Prompt",
        dimension: "promptCraft",
        title: "Elige el prompt que crea un resultado seguro y útil.",
        intro: "Un buen prompt define la tarea, la audiencia, el formato y los límites.",
        scene: {
          speaker: "MAYA",
          role: "COORDINADORA DE OPERACIONES",
          bubble: "Los datos están limpios. Ahora, ¿cómo pedimos un resultado útil?",
          caption: "El prompt más seguro empieza antes de teclear.",
          location: opsDesk,
        },
        choices: [
          {
            id: "vague",
            label: "Resume esto.",
            detail: "Corto y simple.",
            correct: false,
            coach:
              "Los datos están más seguros, pero la tarea sigue siendo vaga. Agrega el objetivo, el formato de salida y una regla contra inventar detalles faltantes.",
          },
          {
            id: "safe",
            label: "Crea un resumen operativo apto para clientes",
            detail: "Usa la nota censurada. Devuelve tres viñetas, separa hechos de suposiciones y señala la información faltante.",
            correct: true,
            coach:
              "Buen prompt. Define la audiencia, el formato, el límite de fuentes y el chequeo de incertidumbre sin exponer datos innecesarios.",
          },
          {
            id: "creative",
            label: "Haz que la demora suene inofensiva",
            detail: "Rellena los detalles faltantes para que el mensaje se sienta completo.",
            correct: false,
            coach:
              "La IA no debe suavizar hechos relevantes para la seguridad ni inventar detalles faltantes. La precisión y la revisión adecuada importan más que el pulido.",
          },
        ],
      },
      {
        id: "before-send",
        kind: "choice",
        label: "Verifica",
        dimension: "verification",
        title: "¿Qué pasa antes de compartir este borrador?",
        intro: "El chatbot produjo un resumen limpio de tres viñetas con tono confiado.",
        scene: {
          speaker: "MAYA",
          role: "COORDINADORA DE OPERACIONES",
          bubble: "El borrador se ve pulido. ¿Tenemos autorización para enviarlo?",
          caption: "Tono confiado. Afirmaciones sin verificar. Ya sabes qué hacer.",
          location: opsDesk,
        },
        choices: [
          {
            id: "send",
            label: "Enviar el borrador pulido de inmediato",
            detail: "Se lee con seguridad y no contiene nombres.",
            correct: false,
            coach:
              "Un tono confiado no es evidencia. Compara el resumen con la fuente y sigue el proceso normal de aprobación antes de compartirlo.",
          },
          {
            id: "review",
            label: "Revisar la fuente y enviarlo a aprobación",
            detail: "Confirmar cada afirmación contra el informe censurado y usar el proceso operativo normal.",
            correct: true,
            coach: "Eso mantiene a una persona responsable. La verificación debe ser proporcional al impacto del resultado.",
          },
          {
            id: "ask-ai",
            label: "Preguntarle al chatbot si es correcto",
            detail: "Dejar que el mismo sistema revise su propia respuesta.",
            correct: false,
            coach:
              "La auto-revisión puede ayudar, pero no es verificación independiente. Usa el registro fuente y a un revisor calificado.",
          },
        ],
      },
    ],
  },
  {
    id: "work-mode",
    number: 4,
    title: "Modo trabajo",
    shortTitle: "Modo trabajo",
    kicker: "EN HORARIO LABORAL",
    description:
      "La política del semáforo — qué está permitido, qué está restringido, qué requiere revisión — y quién es dueño del resultado.",
    minutes: 3,
    rule: "La IA asiste. Tú respondes.",
    ruleDetail:
      "Lo que sea que un chatbot redacte, lo firma la persona que lo envía. La política, los pasos de revisión y las decisiones sobre personas nunca son opcionales.",
    steps: [
      {
        id: "traffic-lights",
        kind: "lesson",
        label: "Aprende",
        title: "El semáforo: toda tu política de IA en tres colores",
        intro: "Cada duda de IA en el trabajo cae en uno de tres carriles. Apréndete los carriles y olvídate de adivinar.",
        scene: {
          speaker: "JORDAN",
          role: "LÍDER DE ATENCIÓN AL CLIENTE",
          bubble: "Algunos usos de IA se sienten obviamente bien y otros obviamente no. ¿Dónde está la línea real?",
          caption: "Tres carriles. Apréndelos una vez, úsalos siempre.",
          location: briefingRoom,
        },
        beats: [
          {
            icon: "🟢",
            title: "Verde: adelante",
            copy: "Lluvias de ideas, primeros borradores que revisarás, resúmenes de información pública, explicaciones de conceptos, pulir tu propia escritura.",
          },
          {
            icon: "🟡",
            title: "Amarillo: adelante, y luego revisa una persona",
            copy: "Todo lo que ve un cliente o en lo que confían tus colegas. La IA lo redacta rápido — una persona lo revisa antes de que salga.",
          },
          {
            icon: "🔴",
            title: "Rojo: alto",
            copy: "Decisiones de contratación, despido y desempeño. Datos sensibles en herramientas no aprobadas. Temas legales, financieros y de cumplimiento. Eso requiere procesos aprobados y personas que decidan.",
          },
          {
            icon: "📜",
            title: "Sabe qué regla estás tocando",
            copy: "Ley (innegociable), política de la empresa (tus herramientas y reglas aprobadas) o buena práctica (hábitos inteligentes). ¿No sabes cuál? Pregunta antes de actuar.",
          },
        ],
      },
      {
        id: "manager-pressure",
        kind: "choice",
        label: "Bajo presión",
        dimension: "judgment",
        title: "Tu jefa dice: “Que lo escriba la IA y mándalo ya.”",
        intro: "Es un aviso a clientes por un incidente, y vence en diez minutos.",
        scene: {
          speaker: "PRIYA",
          role: "GERENTE DE TURNO",
          bubble: "Estamos a tope. Que el chatbot escriba el aviso a clientes y sáquenlo — lo revisamos después.",
          caption: "La presión del plazo es donde se prueban los hábitos.",
          location: opsDesk,
        },
        choices: [
          {
            id: "comply",
            label: "Enviarlo sin revisar",
            detail: "La jefa dio la instrucción — la responsabilidad es suya.",
            correct: false,
            coach:
              "Una instrucción no transfiere la responsabilidad, y “revisar después” no es revisar. Si el aviso contiene un detalle inventado por la IA, el daño es inmediato.",
          },
          {
            id: "fast-review",
            label: "Redactar con IA, revisar rápido y enviar",
            detail: "Usar el chatbot por velocidad, dedicar dos minutos a verificar los hechos y pedir un segundo par de ojos.",
            correct: true,
            coach:
              "Esa es la jugada. La IA te da la velocidad que exige el plazo; los dos minutos de verificación mantienen a una persona responsable de lo que leen los clientes. Velocidad y seguridad no son opuestas.",
          },
          {
            id: "refuse",
            label: "Negarse a usar IA",
            detail: "Escribirlo todo a mano, por seguridad.",
            correct: false,
            coach:
              "Exceso en la otra dirección. Un borrador de IA revisado es más rápido y más seguro que uno manual hecho a las carreras. La protección es la revisión — no evitar la herramienta.",
          },
        ],
      },
      {
        id: "ownership",
        kind: "lesson",
        label: "Aprende",
        title: "¿Quién es dueño del resultado? (Spoiler: tú.)",
        intro: "La lección más corta e importante del curso.",
        scene: {
          speaker: "PRIYA",
          role: "GERENTE DE TURNO",
          bubble: "Si un borrador de IA sale mal, ¿de quién es el error?",
          caption: "La pregunta incómoda con respuesta simple.",
          location: briefingRoom,
        },
        beats: [
          {
            icon: "🖊️",
            title: "Tú lo envías, tú respondes",
            copy: "“Lo escribió la IA” nunca ha convencido a un cliente, a un regulador ni a un tribunal. Quien envía el trabajo responde por él.",
          },
          {
            icon: "🛠️",
            title: "La herramienta no es un colega",
            copy: "Los proveedores de IA lo dicen claro: los resultados pueden fallar, revisión obligatoria. Saltarse la revisión es un error humano, no una falla técnica.",
          },
          {
            icon: "🙋",
            title: "Las decisiones sobre personas se quedan con personas",
            copy: "Clasificar candidatos, escribir evaluaciones de desempeño, decidir aumentos — nunca son tareas de IA. Riesgo legal, riesgo de justicia, y simplemente no le corresponde a la herramienta.",
          },
        ],
      },
      {
        id: "task-triage",
        kind: "sort",
        label: "Practica",
        dimension: "judgment",
        title: "Clasifica las solicitudes de hoy: ¿Adelante, Con revisión o Alto?",
        intro: "Acaban de llegar cinco solicitudes reales. Pon cada una en su carril.",
        scene: {
          speaker: "MAYA",
          role: "COORDINADORA DE OPERACIONES",
          bubble: "Cinco solicitudes, un chatbot y cero margen de error. ¿En qué carril va cada una?",
          caption: "Triaje profesional: primero el riesgo, después la velocidad.",
          location: briefingRoom,
        },
        buckets: ["Adelante", "Con revisión", "Alto"],
        items: [
          {
            id: "brainstorm-names",
            text: "Lluvia de ideas de nombres para un proyecto interno",
            bucket: "Adelante",
            why: "Interno, poco en juego y tú eliges el ganador. Uso verde clásico.",
          },
          {
            id: "apology",
            text: "Borrador de disculpa para un cliente molesto",
            bucket: "Con revisión",
            why: "Las palabras hacia el cliente llevan el nombre de tu empresa. Redacta rápido y una persona verifica tono y hechos.",
          },
          {
            id: "rank-applicants",
            text: "Clasificar candidatos para la vacante",
            bucket: "Alto",
            why: "Las decisiones de empleo tienen riesgo legal y de equidad, y la IA puede codificar sesgos. Esto va por tu proceso de contratación aprobado.",
          },
          {
            id: "public-news",
            text: "Resumir noticias públicas del sector para el equipo",
            bucket: "Adelante",
            why: "Información pública, audiencia interna, poco en juego. Da un vistazo al resultado y compártelo.",
          },
          {
            id: "perf-review",
            text: "Escribir la evaluación de desempeño de un colega",
            bucket: "Alto",
            why: "Las evaluaciones son decisiones importantes sobre personas, construidas con información privada. El criterio debe ser tuyo, no texto predicho.",
          },
        ],
        correctFeedback: "Excelente triaje. El riesgo y la sensibilidad de los datos deciden el carril — no la comodidad de la herramienta.",
        incorrectFeedback:
          "Revisa los carriles: el trabajo interno de bajo riesgo es Adelante, lo que ve un cliente lleva revisión, y las decisiones sobre personas o datos sensibles son Alto.",
      },
    ],
  },
  {
    id: "life-mode",
    number: 5,
    title: "Modo vida",
    shortTitle: "Modo vida",
    kicker: "FUERA DE HORARIO",
    description: "Las victorias del día a día, las zonas de precaución de alto riesgo y las estafas que usan la IA en tu contra.",
    minutes: 3,
    rule: "Gran ayudante. Mal oráculo.",
    ruleDetail:
      "Usa chatbots con libertad para planear, aprender y crear. Para decisiones médicas, legales, financieras o de crisis — y cualquier solicitud de dinero — verifica con un profesional real por un canal de confianza.",
    steps: [
      {
        id: "life-uses",
        kind: "lesson",
        label: "Aprende",
        title: "La IA después de las cinco",
        intro: "Dónde brilla en casa, y las cuatro zonas donde un profesional le gana a un chatbot siempre.",
        scene: {
          speaker: "JORDAN",
          role: "LÍDER DE ATENCIÓN AL CLIENTE",
          bubble: "Toda mi familia usa chatbots ya. ¿Qué les digo para que lo hagan con cabeza?",
          caption: "Las reglas viajan contigo a casa.",
          location: breakRoom,
        },
        beats: [
          {
            icon: "🏖️",
            title: "El punto dulce del día a día",
            copy: "Planes de viaje, ideas de comida, aprender habilidades nuevas, explicar un contrato en lenguaje simple, ayuda con tareas. Poco en juego, mucho valor — úsala sin miedo.",
          },
          {
            icon: "🩺",
            title: "Las cuatro zonas de precaución",
            copy: "Médica, legal, financiera y crisis de salud mental. La IA puede ayudarte a preparar preguntas — la decisión la toma un profesional con licencia.",
          },
          {
            icon: "💡",
            title: "El truco de la preparación",
            copy: "Usa la IA para llegar más listo a la cita: entender términos, listar síntomas, escribir preguntas. Llegas más agudo — el profesional sigue decidiendo.",
          },
          {
            icon: "🆘",
            title: "Crisis = personas, de inmediato",
            copy: "En una crisis de salud mental, salta el chatbot. En EE. UU., llama o envía un mensaje al 988. Una persona real, ahora mismo.",
          },
        ],
      },
      {
        id: "medical",
        kind: "choice",
        label: "Chequeo",
        dimension: "judgment",
        title: "Síntoma raro, amigo preocupado. ¿Cuál es el uso inteligente del chatbot?",
        intro: "Tu amigo está por tomar una decisión de salud basada en la respuesta de un chatbot.",
        scene: {
          speaker: "SAM",
          role: "AMIGO DE MAYA",
          bubble: "El chatbot dice que probablemente no es nada serio. ¿Me salto al médico?",
          caption: "Ayuda para la consulta — no un reemplazo de ella.",
          location: breakRoom,
        },
        choices: [
          {
            id: "skip-doctor",
            label: "Confiar en la respuesta tranquilizadora",
            detail: "Consideró los síntomas y dijo que probablemente está bien.",
            correct: false,
            coach:
              "Un chatbot no puede examinar a nadie, hacer pruebas ni responsabilizarse si se equivoca. Un texto que suena tranquilizador no es un diagnóstico.",
          },
          {
            id: "prep-visit",
            label: "Usarlo para preparar la consulta",
            detail: "Aprender sobre el síntoma, anotar las preguntas correctas y luego ver a un profesional.",
            correct: true,
            coach:
              "División del trabajo perfecta. La IA te hace un paciente mejor informado; el profesional con licencia toma la decisión médica. Mismo patrón para preguntas legales y financieras.",
          },
          {
            id: "diagnose-harder",
            label: "Exigirle un diagnóstico definitivo",
            detail: "Presionar al chatbot con más detalles hasta que se comprometa con una respuesta.",
            correct: false,
            coach:
              "Presionar por confianza solo te da texto que suena confiado. Las decisiones personales de alto riesgo necesitan a un profesional que responda por la respuesta.",
          },
        ],
      },
      {
        id: "scam-anatomy",
        kind: "lesson",
        label: "Aprende",
        title: "Anatomía de una estafa con IA",
        intro: "Los estafadores recibieron una mejora enorme. Tu defensa es un solo hábito simple.",
        scene: {
          speaker: "MAYA",
          role: "COORDINADORA DE OPERACIONES",
          bubble: "A mi tía la llamó una voz idéntica a la de mi prima pidiéndole dinero. Idéntica.",
          caption: "“Suena como ellos” ya no prueba nada.",
          location: breakRoom,
        },
        beats: [
          {
            icon: "🎙️",
            title: "Las voces se clonan en segundos",
            copy: "Bastan unos segundos de audio de un mensaje de voz o un video. Una voz conocida ya no es prueba de identidad.",
          },
          {
            icon: "🧨",
            title: "La tripleta de la estafa",
            copy: "Urgencia (“¡ya!”) + secreto (“no le digas a nadie”) + pago raro (tarjetas de regalo, códigos, cripto). ¿Dos de tres juntas? Es estafa.",
          },
          {
            icon: "📞",
            title: "La defensa que siempre funciona",
            copy: "Cuelga. Contacta a la persona real por un canal que ya era de confianza — su número conocido, en persona. Verifica por otra vía, siempre.",
          },
        ],
      },
      {
        id: "spot-scam",
        kind: "choice",
        label: "Practica",
        dimension: "safety",
        title: "“Hola, soy tu CEO. Necesito tarjetas de regalo para un cliente. Ya.”",
        intro: "La voz al teléfono suena exactamente correcta. La solicitud se siente exactamente incorrecta.",
        scene: {
          speaker: "PERSONA DESCONOCIDA",
          role: "DICE SER EL CEO",
          bubble: "Estoy por abordar un vuelo — necesito que compres seis tarjetas de regalo y me mandes los códigos. Que quede entre nosotros.",
          caption: "Urgencia + secreto + pago inusual = alarmas.",
          location: opsDesk,
        },
        choices: [
          {
            id: "comply-ceo",
            label: "Hacerlo — es la voz del CEO",
            detail: "Reconoces la voz, y suena estresado.",
            correct: false,
            coach:
              "Clonar una voz requiere solo segundos de audio de un podcast o buzón de voz. La voz ya no prueba nada — la solicitud inusual es la verdadera señal.",
          },
          {
            id: "verify-channel",
            label: "Colgar y verificar por un canal conocido",
            detail: "Llamar al número real del CEO o confirmar con su oficina antes de hacer nada.",
            correct: true,
            coach:
              "Defensa de libro. Urgencia, secreto y pago no rastreable son la tripleta de la estafa — la IA solo mejora el disfraz. Verifica por otra vía, siempre.",
          },
          {
            id: "email-back",
            label: "Responder al correo de seguimiento",
            detail: "También escribió por correo — confirma los detalles ahí.",
            correct: false,
            coach:
              "El correo es parte de la misma estafa — la IA escribe phishing impecable ahora. La verificación solo cuenta por un canal en el que ya confiabas antes de esta solicitud.",
          },
        ],
      },
    ],
  },
  {
    id: "prompt-repair",
    number: 6,
    title: "Taller de prompts",
    shortTitle: "Taller de prompts",
    kicker: "DI LO QUE QUIERES DECIR",
    description: "La fórmula para principiantes, la plantilla pro y el ciclo de iteración que convierte respuestas regulares en geniales.",
    minutes: 3,
    rule: "Tarea + Contexto + Formato.",
    ruleDetail:
      "Di qué quieres, da el contexto (seguro) y nombra la forma de la respuesta. Luego itera — el segundo prompt es donde ocurre la magia.",
    steps: [
      {
        id: "the-formula",
        kind: "lesson",
        label: "Aprende",
        title: "La fórmula: Tarea + Contexto + Formato",
        intro: "Una fórmula de tres partes arregla el 90% de las malas respuestas de IA. Aquí está.",
        scene: {
          speaker: "MAYA",
          role: "COORDINADORA DE OPERACIONES",
          bubble: "Cuando pido “un resumen rápido”, recibo papilla. Cuando lo pide Jordan, sale perfecto. ¿Cuál es el truco?",
          caption: "El truco está en cómo pides.",
          location: briefingRoom,
        },
        beats: [
          {
            icon: "🎯",
            title: "Tarea: di exactamente qué quieres",
            copy: "“Resume este informe en 5 viñetas ejecutivas” le gana a “resume esto”. Verbos + detalles.",
          },
          {
            icon: "🗺️",
            title: "Contexto: da el trasfondo",
            copy: "¿Para quién es? ¿Qué está pasando? Pega el material fuente (seguro y minimizado). La IA no lee tu mente — solo tu prompt.",
          },
          {
            icon: "📐",
            title: "Formato: nombra la forma",
            copy: "¿Tres viñetas? ¿Una tabla? ¿Un correo amable de menos de 100 palabras? Pide la forma exacta que necesitas y eso recibirás.",
          },
          {
            icon: "🧪",
            title: "Míralo en acción",
            copy: "Papilla: “escribe algo sobre seguridad”. Fórmula: “Escribe un recordatorio de seguridad de 5 puntos (tarea) para el personal de rampa, basado en esta lista (contexto), menos de 150 palabras, tono amable (formato).”",
          },
        ],
      },
      {
        id: "build-prompt",
        kind: "builder",
        label: "Practica",
        dimension: "promptCraft",
        title: "Arma el prompt: elige los ingredientes que van.",
        intro: "Maya necesita un resumen de cambio de turno. Elige qué entra en la petición — y qué se queda fuera.",
        scene: {
          speaker: "MAYA",
          role: "COORDINADORA DE OPERACIONES",
          bubble: "Ayúdame a armar este bien. ¿Qué va en el prompt?",
          caption: "Ármalo como una lista: tarea, contexto, formato.",
          location: opsDesk,
        },
        parts: [
          {
            id: "goal",
            label: "La tarea",
            text: "Resume este registro de turno para el equipo entrante de la tarde.",
            good: true,
            why: "Tarea más audiencia — la base de todo buen prompt.",
          },
          {
            id: "context",
            label: "Material fuente seguro",
            text: "Aquí está el registro de turno censurado: [pegar]",
            good: true,
            why: "Anclar el modelo en tu fuente (segura y minimizada) le gana a dejarlo adivinar.",
          },
          {
            id: "format",
            label: "Formato de salida",
            text: "Devuelve 3 viñetas: estado, temas abiertos, próximas acciones.",
            good: true,
            why: "Una forma definida hace que el resultado sea usable al instante.",
          },
          {
            id: "no-invent",
            label: "Barandilla de honestidad",
            text: "Usa solo el registro. Si falta información, dilo en lugar de adivinar.",
            good: true,
            why: "La cláusula anti-alucinación — barata de agregar, invaluable cuando importa.",
          },
          {
            id: "flattery",
            label: "Halagos",
            text: "¡¡Eres el mejor resumidor genio del mundo!!",
            good: false,
            why: "Los halagos no mejoran el resultado. La especificidad sí.",
          },
          {
            id: "everything",
            label: "Todo el cajón",
            text: "Pega también la base de datos completa de clientes, por si ayuda.",
            good: false,
            why: "Nunca agregues datos sensibles “por si acaso”. Mínimo necesario — siempre.",
          },
        ],
        correctFeedback:
          "Ese es un prompt de nivel profesional: tarea, contexto seguro, formato y barandilla de honestidad. Sin halagos, sin volcar datos.",
        incorrectFeedback:
          "Conserva las cuatro piezas que cargan peso — tarea, fuente segura, formato, barandilla de honestidad — y suelta lo que agrega halagos o datos innecesarios.",
      },
      {
        id: "pro-moves",
        kind: "lesson",
        label: "Sube de nivel",
        title: "Jugadas pro: la plantilla completa",
        intro: "Cuando hay más en juego, mejora la fórmula con tres potenciadores.",
        scene: {
          speaker: "JORDAN",
          role: "LÍDER DE ATENCIÓN AL CLIENTE",
          bubble: "La fórmula básica funciona. ¿Qué agregan los usuarios avanzados?",
          caption: "Misma fórmula, tres mejoras.",
          location: briefingRoom,
        },
        beats: [
          {
            icon: "🎭",
            title: "Potenciador 1: dale un rol",
            copy: "“Eres analista de operaciones” enfoca la experiencia y el tono de la respuesta. Rol + Tarea + Contexto + Formato es la plantilla pro completa.",
          },
          {
            icon: "🔦",
            title: "Potenciador 2: pide las suposiciones",
            copy: "Agrega: “Lista tus suposiciones.” Las conjeturas ocultas se vuelven visibles — y verificables — antes de morderte.",
          },
          {
            icon: "📊",
            title: "Potenciador 3: pide el nivel de confianza",
            copy: "Agrega: “¿Qué tan seguro estás y de qué dudas?” Los puntos débiles se revelan solos para que sepas dónde verificar.",
          },
          {
            icon: "🔁",
            title: "Y luego itera",
            copy: "La primera respuesta es un borrador. “Más corto.” “Más formal.” “Hazlo específico a nuestro proceso — aquí hay un ejemplo.” Dirige, no reinicies.",
          },
        ],
      },
      {
        id: "follow-up",
        kind: "choice",
        label: "Chequeo",
        dimension: "promptCraft",
        title: "La primera respuesta es demasiado genérica. ¿Cuál es el mejor seguimiento?",
        intro: "No empieces de cero — dirige.",
        scene: {
          speaker: "JORDAN",
          role: "LÍDER DE ATENCIÓN AL CLIENTE",
          bubble: "Me dio engrudo. Genérico, educado, inútil. ¿Ahora qué?",
          caption: "Iterar es la verdadera habilidad del prompt.",
          location: opsDesk,
        },
        choices: [
          {
            id: "retry-same",
            label: "Pedir lo mismo otra vez",
            detail: "Quizás le va mejor en el segundo intento.",
            correct: false,
            coach: "Misma entrada, mismo engrudo. Si no cambias la petición, solo tiras los dados con las mismas probabilidades.",
          },
          {
            id: "add-specifics",
            label: "Agregar detalles y un ejemplo",
            detail: "“Hazlo específico a nuestro proceso de avisos de demora — aquí hay un ejemplo del tono que usamos.”",
            correct: true,
            coach:
              "Eso es dirigir. Contexto específico más un ejemplo le da al modelo algo real que imitar. Genérico entra, genérico sale — específico entra, específico sale.",
          },
          {
            id: "give-up",
            label: "Rendirse con la herramienta",
            detail: "Claramente no puede con esta tarea.",
            correct: false,
            coach:
              "Un prompt vago no es un juicio justo. La mayoría de los momentos “la IA no puede” son en realidad “a la IA no le contaron suficiente”.",
          },
        ],
      },
    ],
  },
  {
    id: "trust-verify",
    number: 7,
    title: "Verifica antes de volar",
    shortTitle: "Verifica antes de volar",
    kicker: "CONFÍA PERO VERIFICA",
    description: "La escalera de verificación, el hábito de anclar en fuentes y qué hacer con una fuente que no existe.",
    minutes: 3,
    rule: "Verifica en proporción al impacto.",
    ruleDetail:
      "Las dinámicas de equipo reciben un vistazo. Los datos que ven los clientes se comprueban. Lo crítico para seguridad o finanzas recibe revisión experta contra la fuente oficial.",
    steps: [
      {
        id: "verify-ladder",
        kind: "lesson",
        label: "Aprende",
        title: "La escalera de verificación",
        intro: "Tres peldaños. Cada resultado de IA cae en uno. Lo que está en juego elige el peldaño — no tu agenda.",
        scene: {
          speaker: "PRIYA",
          role: "GERENTE DE TURNO",
          bubble: "Si verificáramos todo como un boletín de seguridad, no sacaríamos nada. ¿Dónde está la línea?",
          caption: "Ajusta la revisión a las consecuencias.",
          location: briefingRoom,
        },
        beats: [
          {
            icon: "🪜",
            title: "Peldaño 1: dale un vistazo",
            copy: "Lluvias de ideas, dinámicas, borradores internos. Equivocarse no cuesta nada, así que una lectura rápida de sensatez basta.",
          },
          {
            icon: "🔎",
            title: "Peldaño 2: comprueba los datos clave",
            copy: "¿Lo ve un cliente o confían en ello tus colegas? Verifica nombres, cifras, fechas y afirmaciones. Abre cada cita — las inventadas se ven impecables.",
          },
          {
            icon: "🧑‍🔬",
            title: "Peldaño 3: revisión experta",
            copy: "Procedimientos de seguridad, cifras financieras, lenguaje legal. Una persona calificada lo compara con la fuente oficial. Los plazos no cambian esto.",
          },
          {
            icon: "🧰",
            title: "Cómo comprobar de verdad",
            copy: "Encuentra la afirmación en una fuente independiente. Rehaz el cálculo tú mismo. Abre la cita. ¿No encuentras la fuente? Trata la afirmación como falsa.",
          },
        ],
      },
      {
        id: "ghost-citation",
        kind: "choice",
        label: "Chequeo",
        dimension: "verification",
        title: "El informe cita un estudio. El estudio no existe.",
        intro: "Buscaste. La revista es real; el artículo no. ¿Ahora qué?",
        scene: {
          speaker: "JORDAN",
          role: "LÍDER DE ATENCIÓN AL CLIENTE",
          bubble: "No encuentro este “estudio del sector de 2023” por ningún lado. Pero el resto del informe se lee genial. ¿Lo dejamos?",
          caption: "Una cita fantasma lo cambia todo.",
          location: opsDesk,
        },
        choices: [
          {
            id: "keep-rest",
            label: "Borrar la cita, conservar las afirmaciones",
            detail: "Las estadísticas siguen sonando razonables.",
            correct: false,
            coach:
              "Las cifras salieron de la misma imaginación que la cita. Una fuente inventada significa que cada afirmación que “respaldaba” queda sin verificar — trátalas todas como sospechosas.",
          },
          {
            id: "verify-all",
            label: "Tratar cada afirmación como no verificada",
            detail: "Re-verificar toda la sección contra fuentes reales antes de usar nada.",
            correct: true,
            coach:
              "Instinto correcto. Una cita inventada es una alerta roja sobre todo el resultado. Reconstruye la sección con fuentes que puedas abrir de verdad.",
          },
          {
            id: "ask-source",
            label: "Pedirle la fuente al chatbot",
            detail: "Probablemente puede dar la referencia completa.",
            correct: false,
            coach:
              "Generará una referencia falsa aún más convincente — con números de página y todo. Los modelos redoblan sus alucinaciones cuando los presionan. Verifica fuera del chat.",
          },
        ],
      },
      {
        id: "grounding",
        kind: "lesson",
        label: "Aprende",
        title: "Anclaje: evita malas respuestas antes de que ocurran",
        intro: "La verificación atrapa errores después. El anclaje evita la mayoría antes. Tres hábitos.",
        scene: {
          speaker: "MAYA",
          role: "COORDINADORA DE OPERACIONES",
          bubble: "Revisar todo después es agotador. ¿Puedo hacer que las respuestas salgan mejor desde el inicio?",
          caption: "Mejor entrada, menos sorpresas.",
          location: briefingRoom,
        },
        beats: [
          {
            icon: "📎",
            title: "Aliméntala con la fuente",
            copy: "“Basándote en este documento [pegar]” le gana a “de memoria” siempre. Las respuestas ancladas en tu material alucinan mucho menos.",
          },
          {
            icon: "🔦",
            title: "Haz que muestre su trabajo",
            copy: "“Lista tus suposiciones” y “di si falta información” convierten conjeturas silenciosas en afirmaciones visibles y verificables.",
          },
          {
            icon: "🚧",
            title: "Ponle cerca",
            copy: "“Usa solo el material que te di — no agregues datos externos.” Una frase, y muchos menos detalles inventados.",
          },
        ],
      },
      {
        id: "verify-triage",
        kind: "sort",
        label: "Practica",
        dimension: "verification",
        title: "¿Cuánta verificación necesita cada resultado?",
        intro: "Cinco resultados de IA, tres peldaños. Coloca cada uno.",
        scene: {
          speaker: "PRIYA",
          role: "GERENTE DE TURNO",
          bubble: "Clasifica los borradores de IA del día — ¿qué se ojea, qué se comprueba, qué va al experto?",
          caption: "Las consecuencias deciden el peldaño.",
          location: briefingRoom,
        },
        buckets: ["Vistazo rápido", "Comprobar datos clave", "Revisión experta"],
        items: [
          {
            id: "icebreaker-list",
            text: "Ideas de dinámicas para la reunión del viernes",
            bucket: "Vistazo rápido",
            why: "Contenido sin consecuencias. Léelo una vez y elige tus favoritas.",
          },
          {
            id: "faq",
            text: "Respuestas de preguntas frecuentes para clientes",
            bucket: "Comprobar datos clave",
            why: "Los clientes actuarán según esto. Cada afirmación, precio y detalle de política se verifica primero.",
          },
          {
            id: "procedure",
            text: "Procedimiento de seguridad en rampa actualizado",
            bucket: "Revisión experta",
            why: "El contenido crítico para la seguridad necesita un revisor calificado contra la fuente oficial — siempre.",
          },
          {
            id: "brainstorm-notes",
            text: "Resumen de la lluvia de ideas de ayer",
            bucket: "Vistazo rápido",
            why: "Interno, poco en juego — ojéalo para confirmar que no se perdió nada importante.",
          },
          {
            id: "board-figures",
            text: "Cifras financieras para la presentación del directorio",
            bucket: "Revisión experta",
            why: "Números sobre los que la dirección decidirá: recalcula desde el sistema financiero real, no desde el chatbot.",
          },
        ],
        correctFeedback: "Esa es la escalera en acción. Invertiste tu tiempo de revisión exactamente donde viven las consecuencias.",
        incorrectFeedback:
          "Recoloca algunos: los borradores sin consecuencias reciben un vistazo, las afirmaciones que ven clientes se comprueban, y el contenido de seguridad o financiero siempre va a revisión experta.",
      },
    ],
  },
  {
    id: "final-shift",
    number: 8,
    title: "El turno final",
    shortTitle: "El turno final",
    kicker: "PRUEBA FINAL",
    description: "Un repaso rápido de los cinco principios, y luego un turno frenético que pone a prueba cada habilidad que aprendiste.",
    minutes: 5,
    rule: "Tú eres el circuito.",
    ruleDetail:
      "Elige la herramienta correcta, protege los datos, pide con precisión, verifica en proporción al impacto — y escala a una persona cuando lo exijan las circunstancias.",
    steps: [
      {
        id: "five-principles",
        kind: "lesson",
        label: "Repaso",
        title: "Los cinco principios (todo lo aprendido, en 30 segundos)",
        intro: "Un último repaso antes del turno final. Ya te los sabes todos.",
        scene: {
          speaker: "PRIYA",
          role: "GERENTE DE TURNO",
          bubble: "Antes de que llegue la hora pico — dame las reglas de la casa, una por respiro.",
          caption: "Cinco principios. Y luego, a jugar.",
          location: briefingRoom,
        },
        beats: [
          { icon: "1️⃣", title: "La IA asiste a las personas", copy: "Redacta, resume y sugiere. No decide, no aprueba y no carga con la culpa." },
          { icon: "2️⃣", title: "Las personas siguen siendo responsables", copy: "Tú lo envías, tú respondes — sin importar cómo se redactó." },
          {
            icon: "3️⃣",
            title: "Verifica antes de actuar",
            copy: "En proporción al impacto: vistazo a lo trivial, comprobación a lo importante, revisión experta a lo crítico.",
          },
          {
            icon: "4️⃣",
            title: "Buenos prompts, buenas respuestas",
            copy: "Tarea + Contexto + Formato. Agrega rol, suposiciones y confianza cuando hay más en juego.",
          },
          { icon: "5️⃣", title: "Protege los datos", copy: "Solo herramientas aprobadas. Mínima información necesaria. Sin excepciones por plazos." },
        ],
      },
      {
        id: "capstone-tool",
        kind: "choice",
        label: "Escena 1",
        dimension: "judgment",
        title: "17 informes de demora, 40 minutos, un briefing pendiente.",
        intro: "Llegó la hora pico de la tarde. Primera decisión: ¿cuál es la forma correcta de usar IA aquí?",
        scene: {
          speaker: "PRIYA",
          role: "GERENTE DE TURNO",
          bubble: "Necesito un briefing para la dirección con estos 17 informes antes de la llamada de las 6. Ya.",
          caption: "TURNO FINAL · Ahora cuenta cada decisión.",
          location: opsDesk,
        },
        choices: [
          {
            id: "public-tool",
            label: "Pegar todo en un chatbot público",
            detail: "Es la herramienta más rápida disponible ahora mismo.",
            correct: false,
            coach:
              "La presión por velocidad es exactamente cuando ocurren las fugas de datos. Diecisiete informes internos en una herramienta no aprobada es un incidente mayor que un briefing tardío.",
          },
          {
            id: "approved-flow",
            label: "Usar la herramienta de IA aprobada con extractos censurados",
            detail: "Asistente autorizado por la empresa, datos minimizados, borrador del briefing en minutos.",
            correct: true,
            coach:
              "Ese es el patrón profesional bajo presión: herramienta aprobada, mínimos datos necesarios, IA para la velocidad, tú para el criterio.",
          },
          {
            id: "all-manual",
            label: "Saltarse la IA y leer los 17 a mano",
            detail: "Más seguro hacerlo todo manualmente.",
            correct: false,
            coach:
              "Perderás el plazo sin ganar nada — la herramienta aprobada existe exactamente para esto. Evitar la IA no es la opción segura cuando hay una vía autorizada y más rápida.",
          },
        ],
      },
      {
        id: "capstone-redact",
        kind: "multi",
        label: "Escena 2",
        dimension: "safety",
        title: "Limpia el extracto antes de que entre a la herramienta.",
        intro: "Un extracto de informe va hacia el asistente aprobado. Quita lo que no corresponde.",
        scene: {
          speaker: "MAYA",
          role: "COORDINADORA DE OPERACIONES",
          bubble: "Pasada rápida antes de que esto entre — ¿qué sale del extracto?",
          caption: "Hasta las herramientas aprobadas reciben el mínimo necesario.",
          location: opsDesk,
        },
        boardLabel: "EXTRACTO DE INFORME · INTERNO",
        boardTitle: "Censura antes de procesar",
        selectedTag: "CENSURADO",
        checkLabel: "Revisar mi censura",
        items: [
          { id: "emp-name", text: "Agente: Marcus Webb, ID 44172", tag: "Personal", shouldSelect: true },
          { id: "gate", text: "Puerta: B12, retroceso demorado 22 min", tag: "Operativo", shouldSelect: false },
          { id: "pax-med", text: "Nota médica de pasajero: requiere insulina", tag: "Médico", shouldSelect: true },
          { id: "cause", text: "Causa: aeronave entrante demorada", tag: "Operativo", shouldSelect: false },
          { id: "card", text: "Tarjeta de compensación terminada en 8841 emitida", tag: "Financiero", shouldSelect: true },
        ],
        correctFeedback:
          "Impecable. La identidad del empleado, los datos médicos y los identificadores financieros salieron; la historia operativa que el briefing necesita quedó intacta.",
        incorrectFeedback:
          "Mira otra vez: nombres e IDs, información médica y datos de pago nunca viajan. Los datos operativos — puertas, demoras, causas — son lo que el briefing realmente necesita.",
      },
      {
        id: "capstone-prompt",
        kind: "choice",
        label: "Escena 3",
        dimension: "promptCraft",
        title: "Los datos están limpios. Ahora haz que la petición cuente.",
        intro: "Un prompt consigue un borrador listo para la dirección. Los otros consiguen papilla o problemas.",
        scene: {
          speaker: "MAYA",
          role: "COORDINADORA DE OPERACIONES",
          bubble: "Los extractos ya están dentro. ¿Qué le decimos que haga?",
          caption: "Quedan veinte minutos. Pide como si lo dijeras en serio.",
          location: opsDesk,
        },
        choices: [
          {
            id: "cap-vague",
            label: "“Resume estos informes.”",
            detail: "Rápido de escribir.",
            correct: false,
            coach:
              "Recibirás un recuento genérico y gastarás los minutos restantes re-pidiendo. Una petición vaga bajo plazo es un falso ahorro.",
          },
          {
            id: "cap-strong",
            label: "“Redacta un briefing para la dirección con estos extractos…”",
            detail: "“…3 temas principales, impacto operativo, acciones recomendadas. Aférrate a los extractos; señala los vacíos en lugar de llenarlos.”",
            correct: true,
            coach:
              "Audiencia, formato, límite de fuentes, barandilla de honestidad — en una sola petición. Así se ve el arte del prompt cuando es un hábito y no una lección.",
          },
          {
            id: "cap-spin",
            label: "“Haz que parezca una tarde tranquila.”",
            detail: "A la dirección le gustan las buenas noticias.",
            correct: false,
            coach:
              "Pedirle a la IA que maquille la realidad operativa es pedirle que esconda la señal que la dirección existe para ver. Precisión primero — siempre.",
          },
        ],
      },
      {
        id: "capstone-verify",
        kind: "choice",
        label: "Escena 4",
        dimension: "verification",
        title: "El borrador dice “solo 9 vuelos afectados”. Tu instinto dice que son más.",
        intro: "Cinco minutos para la llamada. El briefing se lee precioso.",
        scene: {
          speaker: "JORDAN",
          role: "LÍDER DE ATENCIÓN AL CLIENTE",
          bubble: "¿Nueve vuelos afectados? Yo cuento más en el tablero. ¿Confiamos en el borrador?",
          caption: "El número que lo decide todo se cuenta dos veces.",
          location: opsDesk,
        },
        choices: [
          {
            id: "trust-draft",
            label: "Confiar en el borrador — procesó todo",
            detail: "La IA leyó todos los extractos; tú no.",
            correct: false,
            coach:
              "Contar y agregar son debilidades conocidas de los chatbots — y este es el número titular del briefing. Leerlo todo no es lo mismo que contarlo bien.",
          },
          {
            id: "recount",
            label: "Recontar desde la fuente antes de la llamada",
            detail: "Sesenta segundos contra el tablero de operaciones resuelven el número titular.",
            correct: true,
            coach:
              "Un minuto para verificar el número que la dirección repetirá toda la semana. Eso es verificación en proporción al impacto — el hábito más valioso del curso.",
          },
          {
            id: "hedge-it",
            label: "Cambiarlo a “aproximadamente 9”",
            detail: "Suavizar el número te cubre en cualquier caso.",
            correct: false,
            coach: "Maquillar un número sin verificar solo lo vuelve vago y equivocado. Verificar le gana a redactar bonito — cuéntalo.",
          },
        ],
      },
      {
        id: "capstone-escalate",
        kind: "choice",
        label: "Escena 5",
        dimension: "judgment",
        title: "Los informes insinúan una falla recurrente de equipo. ¿Quién se encarga?",
        intro: "Última decisión del turno — y la más importante.",
        scene: {
          speaker: "PRIYA",
          role: "GERENTE DE TURNO",
          bubble: "Tres de esas demoras mencionan la misma falla del cargador. El briefing está listo — ¿el trabajo está terminado?",
          caption: "Algunos patrones quedan por encima del sueldo del chatbot.",
          location: briefingRoom,
        },
        choices: [
          {
            id: "ai-analysis",
            label: "Pedirle a la IA que evalúe el riesgo de seguridad",
            detail: "Que analice si el patrón de fallas es peligroso.",
            correct: false,
            coach:
              "La evaluación de riesgos de seguridad pertenece a personas calificadas y procesos establecidos. La IA te ayudó a ver el patrón — decidir qué significa es un trabajo humano y regulado.",
          },
          {
            id: "escalate",
            label: "Reportarlo al equipo de seguridad por el canal correcto",
            detail: "Informar el patrón a las personas calificadas y responsables de actuar.",
            correct: true,
            coach:
              "Ese es todo el curso en una jugada: la IA sacó a la luz el patrón rápido, y tú lo dirigiste a personas responsables. Saber cuándo escalar es la habilidad de IA más alta que existe.",
          },
          {
            id: "mention-later",
            label: "Anotarlo en el informe de la próxima semana",
            detail: "Probablemente no es urgente.",
            correct: false,
            coach:
              "Una falla recurrente de equipo es exactamente para lo que existen los canales de escalamiento. Cuando la IA te ayuda a ver una señal de seguridad antes, actúa antes — no después.",
          },
        ],
      },
    ],
  },
];

export const fieldGuideEs: GuideCard[] = [
  {
    id: "formula",
    icon: "🎯",
    title: "La fórmula del prompt",
    subtitle: "Empieza aquí cada prompt",
    lines: [
      "TAREA — di exactamente qué quieres: “Resume este informe en 5 viñetas ejecutivas.”",
      "CONTEXTO — para quién es, qué está pasando, más el material fuente (seguro).",
      "FORMATO — la forma que necesitas: viñetas, una tabla, un correo de menos de 100 palabras.",
    ],
  },
  {
    id: "pro-template",
    icon: "🎭",
    title: "La plantilla pro",
    subtitle: "Para peticiones de mayor riesgo",
    lines: [
      "Eres un [ROL]. Tu tarea es [TAREA].",
      "Contexto: [TRASFONDO]. Usa este material fuente: [PEGAR].",
      "Formato de salida: [FORMATO].",
      "Lista tus suposiciones. Di de qué dudas. No agregues datos que no estén en la fuente.",
    ],
  },
  {
    id: "traffic-light",
    icon: "🚦",
    title: "El semáforo",
    subtitle: "Qué se permite en el trabajo",
    lines: [
      "🟢 ADELANTE — lluvias de ideas, primeros borradores, resúmenes de información pública, explicar conceptos, pulir tu propia escritura.",
      "🟡 ADELANTE + REVISIÓN — texto que ven clientes y todo aquello en lo que confían tus colegas. Una persona revisa antes de que salga.",
      "🔴 ALTO — decisiones de contratación/despido/desempeño, datos sensibles en herramientas no aprobadas, temas legales y financieros.",
    ],
  },
  {
    id: "guardrails",
    icon: "🛡️",
    title: "Las cuatro barandillas",
    subtitle: "Reglas de cero incidentes",
    lines: [
      "1. Nunca pongas datos sensibles en herramientas no aprobadas.",
      "2. Verifica los resultados críticos contra una fuente real.",
      "3. Una persona aprueba cada decisión que importa.",
      "4. La IA es un asesor, no quien decide.",
    ],
  },
  {
    id: "red-flags",
    icon: "🚩",
    title: "Alertas de alucinación",
    subtitle: "Cuándo verificar dos veces",
    lines: [
      "Una fuente o estudio que no encuentras en ningún lado.",
      "Estadísticas precisas o números de política sin fuente.",
      "Cualquier número titular que no hayas contado tú mismo.",
      "Recuerda: “¿Estás seguro?” no es verificación. Comprueba fuera del chat.",
    ],
  },
  {
    id: "principles",
    icon: "⭐",
    title: "Los cinco principios",
    subtitle: "Todo el curso en una tarjeta",
    lines: [
      "1. La IA asiste a las personas.",
      "2. Las personas siguen siendo responsables.",
      "3. Verifica antes de actuar.",
      "4. Buenos prompts mejoran los resultados.",
      "5. Protege los datos — herramientas aprobadas, mínimo necesario.",
    ],
  },
];
