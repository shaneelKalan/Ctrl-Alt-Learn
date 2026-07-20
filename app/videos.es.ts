import type { VideoLesson } from "./videos";

export const videoLibraryEs: VideoLesson[] = [
  {
    id: "intro-to-ai",
    number: 1,
    title: "Introducción a la IA",
    subtitle: "Qué es, qué no es, y la única regla que importa",
    minutes: "~7 min",
    linkMissionId: "meet-ai",
    scenes: [
      {
        id: "title",
        visual: "title",
        narration:
          "Bienvenido a Ctrl+Alt+Learn. En los próximos minutos vamos a desmitificar la tecnología más comentada de nuestro tiempo: la inteligencia artificial. Sin tecnicismos. Sin exageraciones. Solo lo que de verdad necesitas saber.",
        caption: "Introducción a la IA — sin tecnicismos ni exageraciones",
        seconds: 19,
      },
      {
        id: "question",
        visual: "question",
        narration:
          "Todos hablan de la IA. Tu teléfono la tiene. Tu correo la tiene. Y es probable que alguien en el trabajo ya te haya pedido que simplemente uses la IA para algo. Pero hay una pregunta que casi nadie se detiene a hacer: ¿qué está haciendo en realidad?",
        caption: "¿Qué está haciendo la IA en realidad?",
        seconds: 23,
      },
      {
        id: "predict",
        visual: "predict",
        narration:
          "En esencia, la IA moderna es una máquina de predicción. Se entrenó con una cantidad enorme de texto — libros, artículos y sitios web — y aprendió los patrones de cómo escriben las personas. Así que cuando le preguntas algo, no busca un dato en una base de datos. Predice, palabra por palabra, qué debería venir después.",
        caption: "La IA predice la siguiente palabra — no busca datos",
        seconds: 28,
      },
      {
        id: "autocomplete",
        visual: "autocomplete",
        narration:
          "En realidad llevas años usando una versión diminuta de esto. Es el autocompletado de tu teléfono. Escribe 'llego en cinco' y tu teléfono sugiere 'minutos'. La IA es esa misma idea, pero potenciada — capaz de predecir párrafos enteros, correos e incluso código de computadora que funciona.",
        caption: "Es autocompletado — potenciado",
        seconds: 23,
      },
      {
        id: "chatbot",
        visual: "chatbot",
        narration:
          "El motor detrás de todo esto tiene un nombre: un modelo de lenguaje grande, o L-L-M. Cuando envuelves ese motor en una ventana de chat — como Microsoft Copilot — obtienes un chatbot. Recuerda tu conversación actual, y eso es lo que hace que sientas que de verdad hablas con él.",
        caption: "LLM + ventana de chat = chatbot",
        seconds: 25,
      },
      {
        id: "generative",
        visual: "generative",
        narration:
          "Escucharás mucho la palabra 'generativa'. Simplemente significa que la IA crea algo nuevo cada vez, en lugar de elegir de una lista de respuestas guardadas. Haz la misma pregunta dos veces y podrías recibir dos respuestas distintas. Eso no es un error. Eso es generación.",
        caption: "'Generativa' = crea algo nuevo cada vez",
        seconds: 22,
      },
      {
        id: "superpowers",
        visual: "superpowers",
        narration:
          "Entonces, ¿en qué es genuinamente buena? En tres cosas, sobre todo. Puede resumir — convertir un informe largo en unas pocas viñetas claras. Puede redactar — convertir tus notas sueltas en un correo pulido. Y puede explicar — desglosar cualquier tema, a cualquier nivel, con paciencia infinita. Bien usada, eso es un verdadero superpoder para el trabajo diario.",
        caption: "Buena para: resumir, redactar, explicar",
        seconds: 28,
      },
      {
        id: "hallucination",
        visual: "hallucination",
        narration:
          "Pero hay una trampa, y es lo más importante de todo este video. Como la IA predice lo que suena bien, a veces puede producir cosas que suenan totalmente convincentes y están totalmente equivocadas. Puede inventar hechos, inventar estadísticas, incluso citar estudios que no existen. A esto se le llama alucinación.",
        caption: "La trampa: la IA puede 'alucinar' — suena bien, está mal",
        seconds: 27,
      },
      {
        id: "confidence",
        visual: "confidence",
        narration:
          "Y aquí está lo complicado: dice las cosas incorrectas con exactamente la misma seguridad que las correctas. El tono nunca cambia. Así que no puedes distinguir la verdad de la ficción por lo segura que suena. La confianza no es evidencia.",
        caption: "La confianza no es evidencia",
        seconds: 20,
      },
      {
        id: "context",
        visual: "context",
        narration:
          "Hay un límite más que vale la pena conocer. La IA no conoce tu mundo. No conoce las políticas de tu empresa, tus clientes, ni lo que pasó esta mañana — a menos que se lo digas. Y cuando no lo sabe, a menudo llena el vacío con una suposición confiada.",
        caption: "No conoce TU mundo — a menos que se lo digas",
        seconds: 22,
      },
      {
        id: "goldenrule",
        visual: "goldenrule",
        narration:
          "Entonces, ¿cómo la usamos de forma segura? Una regla de oro lo une todo: la IA es un asesor, no quien decide. Deja que redacte, resuma y sugiera — ahí es donde brilla. Pero una persona siempre revisa el resultado y toma la decisión final. Cada vez, sin excepción.",
        caption: "La regla de oro: la IA asesora, las personas deciden",
        seconds: 23,
      },
      {
        id: "recap",
        visual: "recap",
        narration:
          "Cerremos la idea. La IA es una máquina de predicción — rápida, potente y genuinamente útil. Pero puede equivocarse con confianza, no conoce tu mundo, y nunca debería tomar la decisión final por sí sola. Ten presente esas tres cosas y ya estás por delante de la mayoría de quienes la usan. ¿Listo para practicar? Tu primera misión te espera.",
        caption: "Estás listo — vamos a practicar",
        seconds: 28,
        recapItems: ["Predice — puede equivocarse con confianza", "No conoce tu mundo", "Nunca decide sola"],
      },
    ],
  },
  {
    id: "copilot-safe-tool",
    number: 2,
    title: "Copilot: Tu herramienta segura",
    subtitle: "Por qué Microsoft Copilot es la IA aprobada de DASI — y la regla que lo acompaña",
    minutes: "~5 min",
    scenes: [
      {
        id: "title",
        visual: "title",
        narration:
          "En DASI no usamos cualquier IA. Usamos una sola herramienta, a propósito, porque está diseñada para mantener nuestro trabajo seguro. En los próximos minutos aprenderás cuál es, por qué la elegimos y la única regla que la acompaña.",
        caption: "Copilot: tu IA aprobada en DASI",
        seconds: 21,
      },
      {
        id: "question",
        visual: "question",
        narration:
          "Hay docenas de chatbots de IA por ahí — ChatGPT, Claude, Gemini y más. Todos pueden verse y sentirse parecidos. Entonces, cuando hay trabajo que hacer, ¿cuál deberías abrir en realidad? En DASI, la respuesta ya está decidida por ti.",
        caption: "Tantas herramientas de IA — ¿cuál para el trabajo?",
        seconds: 22,
      },
      {
        id: "copilot",
        visual: "copilot",
        narration:
          "Es Microsoft Copilot. Copilot es el asistente de IA aprobado de DASI, y está integrado en las herramientas de Microsoft que ya usas todos los días. Cuando usas Copilot en el trabajo, usas la herramienta que la empresa eligió y protegió.",
        caption: "Conoce Microsoft Copilot — nuestra herramienta aprobada",
        seconds: 22,
      },
      {
        id: "guardrails",
        visual: "guardrails",
        narration:
          "Aquí está el porqué importa. Nuestro Copilot empresarial funciona dentro de las protecciones de Microsoft de DASI. Tus indicaciones y los datos que compartes se quedan dentro del límite de cumplimiento de la empresa, y no se usan para entrenar modelos públicos de IA. En otras palabras: está dentro de nuestras barandillas.",
        caption: "Copilot funciona dentro de las barandillas de DASI",
        seconds: 26,
      },
      {
        id: "two-chats",
        visual: "two-chats",
        narration:
          "Ahora compáralo con un chatbot gratuito o una cuenta personal. Puede verse como exactamente la misma ventana de chat. Pero no tiene el acuerdo de DASI detrás. Las reglas de datos son distintas, y tu información de trabajo podría terminar donde no debe. Misma ventana — protección muy distinta.",
        caption: "Misma ventana de chat, reglas muy distintas",
        seconds: 25,
      },
      {
        id: "copilot",
        visual: "copilot",
        narration:
          "Y para que quede claro, esto no se trata de que una IA sea inteligente y otra sea mala. Las otras herramientas no son el enemigo. Se trata de cuál está protegida por contrato para los datos de DASI. Copilot es la que está aprobada y dentro de nuestras barandillas, así que es la que usamos para el trabajo.",
        caption: "No es de buena o mala — es de aprobada",
        seconds: 24,
      },
      {
        id: "two-chats",
        visual: "two-chats",
        narration:
          "Así que aquí está la regla, y es el corazón de todo este video. Para el trabajo, usa Copilot. No uses ChatGPT, Claude ni ninguna otra herramienta de IA para el trabajo de la empresa a menos que haya sido aprobada explícitamente. Cuando se trata de datos de DASI: solo herramientas aprobadas.",
        caption: "La regla: Copilot para el trabajo — las demás requieren aprobación",
        seconds: 24,
      },
      {
        id: "superpowers",
        visual: "superpowers",
        narration:
          "¿La buena noticia? No pierdes nada. Copilot hace todo lo que querrías de una IA — resume documentos largos, redacta tus correos y explica temas difíciles — solo que sobre contenido de trabajo, de forma segura, dentro de las barandillas.",
        caption: "Copilot hace los mismos superpoderes — de forma segura",
        seconds: 21,
      },
      {
        id: "ask",
        visual: "question",
        narration:
          "Y si alguna vez crees que otra herramienta ayudaría de verdad, no tienes que renunciar a ella. Solo pregunta antes de usarla. Conseguir que algo se apruebe suele ser una conversación rápida con tu jefe o con T-I — no un callejón sin salida.",
        caption: "¿Necesitas otra herramienta? Solo pregunta primero",
        seconds: 22,
      },
      {
        id: "recap",
        visual: "recap",
        narration:
          "Cerremos la idea. En DASI, Copilot es tu IA aprobada, funciona dentro de las protecciones de la empresa, y para el trabajo es donde empiezas. Las demás herramientas requieren aprobación primero. Así de simple.",
        caption: "Copilot primero. Solo herramientas aprobadas.",
        seconds: 20,
        recapItems: ["Copilot está aprobado por DASI", "Funciona dentro de nuestras barandillas", "Las demás requieren aprobación"],
      },
    ],
  },
  {
    id: "work-vs-personal",
    number: 3,
    title: "Cuenta de trabajo, cuenta personal",
    subtitle: "Mantén los datos de trabajo en la herramienta de trabajo — con las barandillas puestas",
    minutes: "~5 min",
    scenes: [
      {
        id: "title",
        visual: "title",
        narration:
          "Probablemente tienes más de una forma de acceder a la IA — una en el trabajo y una en casa. Mantenerlas separadas es uno de los hábitos de seguridad más importantes que existen. Hagámoslo fácil.",
        caption: "Cuenta de trabajo, cuenta personal",
        seconds: 19,
      },
      {
        id: "two-accounts",
        visual: "two-accounts",
        narration:
          "Piénsalo como dos mundos separados. Está tu cuenta de trabajo de DASI — con la que inicias sesión usando tu acceso de la empresa. Y están tus cuentas personales — tu propio correo, tus propias suscripciones, en casa. Ambas pueden tener IA, pero no son lo mismo.",
        caption: "Vives en dos mundos de IA",
        seconds: 25,
      },
      {
        id: "guardrails",
        visual: "guardrails",
        narration:
          "Cuando inicias sesión en Copilot con tu cuenta de DASI, entras dentro de las protecciones de la empresa. Aquí es donde pertenece el trabajo. Tus datos de trabajo deben vivir aquí — en la herramienta aprobada, en la cuenta de trabajo.",
        caption: "Cuenta de trabajo = dentro de las protecciones de DASI",
        seconds: 22,
      },
      {
        id: "personal-safe",
        visual: "personal-safe",
        narration:
          "Tus cuentas personales son otra historia. Chatbots gratuitos, tus propios accesos, tu teléfono en casa. Son fantásticas para tu vida personal — planear un viaje, una receta, aprender un pasatiempo. Pero no tienen ninguna de las protecciones de DASI.",
        caption: "Cuentas personales = geniales para tu vida",
        seconds: 23,
      },
      {
        id: "crossstreams",
        visual: "crossstreams",
        narration:
          "Así que aquí es donde vive el verdadero riesgo. No es la herramienta en sí. Es cruzar los mundos: tomar los datos de trabajo de DASI y ponerlos en una cuenta personal. En el momento en que la información de trabajo sale de la cuenta de trabajo, deja atrás las barandillas.",
        caption: "El verdadero peligro: datos de trabajo en una cuenta personal",
        seconds: 24,
      },
      {
        id: "temptation",
        visual: "chatbot",
        narration:
          "Y suele empezar de forma inocente. 'Lo termino en casa en mi chatbot personal.' Parece inofensivo. Pero ese único pegado saca los datos de la empresa fuera de todas las protecciones que tenemos. Por muy tentador que sea el atajo, mantén los datos de trabajo en la cuenta de trabajo.",
        caption: "El atajo tentador — no lo tomes",
        seconds: 24,
      },
      {
        id: "personal-free",
        visual: "personal-safe",
        narration:
          "El otro lado es liberador. En tu vida personal, usa la IA que quieras — nadie te lo impide. La única línea es esta: nunca pongas datos confidenciales o de clientes de DASI en una cuenta personal. Tu vida, tus herramientas. Datos de trabajo, herramientas de trabajo.",
        caption: "En casa, usa la IA con libertad — pero no con datos de trabajo",
        seconds: 23,
      },
      {
        id: "test",
        visual: "question",
        narration:
          "Cuando no estés seguro, haz una comprobación de dos segundos antes de teclear. Pregúntate: ¿estoy en mi cuenta de trabajo? ¿Y esto son datos de trabajo? Si son datos de trabajo, van en Copilot en tu cuenta de DASI. Emparéjalos, cada vez.",
        caption: "Prueba rápida: ¿cuenta correcta, datos correctos?",
        seconds: 22,
      },
      {
        id: "recap",
        visual: "recap",
        narration:
          "Cerremos la idea. Los datos de trabajo van en tu cuenta de trabajo de Copilot. La vida personal va en tus cuentas personales. Nunca mezcles las dos, y habrás dominado uno de los mayores hábitos de seguridad de IA que existen.",
        caption: "Datos de trabajo → Copilot de trabajo. Nunca mezcles.",
        seconds: 20,
        recapItems: ["Datos de trabajo → Copilot de trabajo", "Vida personal → cuentas personales", "Nunca mezcles las dos"],
      },
    ],
  },
  {
    id: "dasi-playbook",
    number: 4,
    title: "El manual de IA de DASI",
    subtitle: "Tu guía de decisiones de una página para la IA en el trabajo",
    minutes: "~4 min",
    linkMissionId: "work-mode",
    scenes: [
      {
        id: "title",
        visual: "title",
        narration:
          "Juntemos todo en un manual simple que puedes llevar a cualquier día de trabajo — cuándo y cómo recurrir a la IA en DASI, en unos pocos pasos claros.",
        caption: "El manual de IA de DASI",
        seconds: 17,
      },
      {
        id: "copilot",
        visual: "copilot",
        narration:
          "Paso uno: cuando haya trabajo que hacer, abre Copilot. Es la opción aprobada y protegida por defecto, con tu cuenta de DASI iniciada. Esa es tu línea de salida, cada vez.",
        caption: "Paso 1: para el trabajo, abre Copilot",
        seconds: 18,
      },
      {
        id: "traffic",
        visual: "traffic",
        narration:
          "A partir de ahí, lee el semáforo. Tres carriles te dicen cómo manejar casi cualquier cosa de IA en el trabajo: verde significa adelante, amarillo significa adelante con revisión, y rojo significa alto y pregunta. Vamos uno por uno.",
        caption: "Luego lee el semáforo",
        seconds: 21,
      },
      {
        id: "green",
        visual: "superpowers",
        narration:
          "Luz verde — adelante. Generar ideas, redactar contenido que revisarás, y resumir trabajo interno y no sensible. Estas son victorias diarias en Copilot. Úsalo con libertad, y dale una lectura rápida al resultado antes de confiar en él.",
        caption: "Verde: generar ideas, redactar, resumir",
        seconds: 22,
      },
      {
        id: "yellow",
        visual: "goldenrule",
        narration:
          "Luz amarilla — adelante, luego revisa. Cualquier cosa que verá un cliente, o de la que dependerá un colega. Deja que Copilot lo redacte rápido, pero una persona calificada siempre lo revisa antes de que salga. La IA redacta; las personas aprueban.",
        caption: "Amarillo: una persona revisa antes de que salga",
        seconds: 21,
      },
      {
        id: "red",
        visual: "stop",
        narration:
          "Luz roja — alto. Datos confidenciales, regulados o sensibles para la seguridad. O querer usar una herramienta que no está aprobada. O dejar que la IA tome una decisión final sobre personas o seguridad. En el carril rojo, te detienes y preguntas antes de actuar.",
        caption: "Rojo: alto y pregunta primero",
        seconds: 23,
      },
      {
        id: "nevers",
        visual: "crossstreams",
        narration:
          "Y unos cuantos noes rotundos que vale la pena memorizar. Nunca pongas datos de trabajo en una cuenta personal. Nunca uses una herramienta no aprobada para el trabajo de la empresa. Y nunca dejes que la IA tome la decisión final sobre algo que afecta a personas o a la seguridad. Esas líneas no se mueven.",
        caption: "Los noes rotundos — nunca hagas esto",
        seconds: 23,
      },
      {
        id: "recap",
        visual: "recap",
        narration:
          "Ese es todo el manual. Para el trabajo, Copilot primero. Mantén los datos de trabajo en tu cuenta de trabajo. Verifica lo que importa. Y cuando no estés seguro, pregunta — una pregunta le gana a un incidente. Estás listo. Ve a ponerlo en práctica.",
        caption: "Copilot primero. Verifica. Pregunta si dudas.",
        seconds: 22,
        recapItems: ["Copilot primero, para el trabajo", "Cuenta de trabajo para datos de trabajo", "Verifica — luego pregunta si dudas"],
      },
    ],
  },
];
