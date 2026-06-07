export type Language = "it" | "en" | "zh";

export const dictionaries = {
  it: {
    projects: {
      title: "I miei progetti",
      subtitle: "Ecco alcuni dei progetti che ci tengo a condividere",
      iot: {
        tag: "Rete",
        title: "Ecosistema IoT Cloud di Videosorveglianza per la Scuola",
        desc: "Infrastruttura IoT end-to-end per flussi video real-time 720p. Ottimizzazione a basso livello in Assembly x86 per massimizzare il throughput dei buffer di memoria su nodi edge (Raspberry Pi), con orchestrazione cloud in Python e cifratura dei dati. Questo progetto l'ho fatto alle superiori col mio prof. di Sistemi e Reti e dei miei compagni di classe l'idea mi ha subito incuriosito perchè sono sempre stato affascinato dal mondo dell'IT",
        list1: "Ingegnerizzazione Case CAD & Stampa 3D per dissipatione termica.",
        list2: "Indicizzazione spazio-temporale dei metadati video.",
        list3: "Abbattimento Intoppi di I/O tramite routine custom a basso livello.",
        pipeline_title: "ARCHITETTURA DEL DATO (LIVE TIMELINE)",
        pipeline_desc: "Il flusso video bypassa gli intoppi del Kernel Linux, scrivendo direttamente nel buffer di memoria tramite routine x86.",
        bench_title: "BENCHMARK: I/O THROUGHPUT (MB/s)",
        bench_calc: "Calcolo...",
        bench_start: "Avvia Test",
        bench_opt: "Ottimizzazione a basso livello: +300% velocità di svuotamento buffer memoria.",
        cloud_title: "TELEMETRIA CLOUD CENTRALIZZATA",
        cloud_spacetime: "Spazio-Temporale:"
      },
      nfc: {
        tag_idle: "Phygital Experience",
        tag_tapping: "Lettura Tag...",
        tag_showing: "E siamo connessi😊",
        title: "NFC Smart Portfolio",
        desc: "Ecosistema hardware-software per lo scambio di contatti. Sviluppo di una web-app ultra-leggera ottimizzata per il caricamento istantaneo all'atto del \"Tap\" con una card NFC fisica. L'idea mi è venuta pensando ai bigliettini da visita tradizionali (di cui facevo collezione) mi ha sempre affascinato il gesto di riceverlo da una persona, un ristorante e vedere quanto fossero belli ed intriganti i loro stili, quindi ho pensato di creare una versione digitale che potesse essere condivisa con un semplice gesto, senza bisogno di app o connessioni lente. Le mie key words erano semplice ed accessibile a tutti, senza perdere quella sensazione di condivisione con qualcuno.",
        list1: "Scrittura payload NDEF sicuri tramite Web NFC API.",
        list2: "Ingegnerizzazione del design grafico della tessera fisica.",
        list3: "Ottimizzazione estrema degli asset web per connessioni mobile 4G/5G lente.",
        card_type: "Carta NFC",
        prompt: "👆 Fai il \"Tap\" con lo smartphone per leggerla",
        reading: "Lettura...",
        reset: "Allontana telefono"
      }
    }
  },
  en: {
    projects: {
      title: "My Projects",
      subtitle: "Here are some projects I'd like to share",
      iot: {
        tag: "Network",
        title: "Cloud IoT Video Surveillance Ecosystem for Schools",
        desc: "End-to-end IoT infrastructure for real-time 720p video streams. Low-level optimization in x86 Assembly to maximize memory buffer throughput on edge nodes (Raspberry Pi), with Python cloud orchestration and data encryption. I did this project in high school with my Systems and Networks professor and my classmates. The idea immediately intrigued me because I've always been fascinated by the IT world.",
        list1: "CAD Case Engineering & 3D Printing for thermal dissipation.",
        list2: "Spatio-temporal indexing of video metadata.",
        list3: "Elimination of I/O bottlenecks via custom low-level routines.",
        pipeline_title: "DATA ARCHITECTURE (LIVE TIMELINE)",
        pipeline_desc: "The video stream bypasses Linux Kernel bottlenecks, writing directly to the memory buffer via x86 routines.",
        bench_title: "BENCHMARK: I/O THROUGHPUT (MB/s)",
        bench_calc: "Calculating...",
        bench_start: "Start Test",
        bench_opt: "Low-level optimization: +300% memory buffer flush speed.",
        cloud_title: "CENTRALIZED CLOUD TELEMETRY",
        cloud_spacetime: "Spatio-Temporal:"
      },
      nfc: {
        tag_idle: "Phygital Experience",
        tag_tapping: "Reading Tag...",
        tag_showing: "And we're connected😊",
        title: "NFC Smart Portfolio",
        desc: "Hardware-software ecosystem for contact sharing. Development of an ultra-lightweight web-app optimized for instant loading upon \"Tapping\" a physical NFC card. The idea came to me thinking about traditional business cards (which I used to collect). I've always been fascinated by the gesture of receiving one from a person or a restaurant and seeing how beautiful and intriguing their styles were. So I thought of creating a digital version that could be shared with a simple gesture, without the need for apps or slow connections. My keywords were simple and accessible to everyone, without losing that feeling of sharing with someone.",
        list1: "Secure NDEF payload writing via Web NFC API.",
        list2: "Graphic design engineering of the physical card.",
        list3: "Extreme optimization of web assets for slow 4G/5G mobile connections.",
        card_type: "NFC Card",
        prompt: "👆 \"Tap\" with your smartphone to read it",
        reading: "Reading...",
        reset: "Move phone away"
      }
    }
  },
  zh: {
    projects: {
      title: "我的项目",
      subtitle: "这里有一些我想分享的项目",
      iot: {
        tag: "网络",
        title: "面向学校的物联网云视频监控生态系统",
        desc: "用于实时 720p 视频流的端到端物联网基础设施。在边缘节点（树莓派）上使用 x86 汇编进行低级优化，以最大化内存缓冲区吞吐量，并结合 Python 云编排和数据加密。这是我在高中时与我的系统和网络教授以及同学一起做的项目。这个想法立刻引起了我的兴趣，因为我一直对 IT 世界充满热情。",
        list1: "用于散热的 CAD 外壳工程与 3D 打印。",
        list2: "视频元数据的时空索引。",
        list3: "通过自定义低级例程消除 I/O 瓶颈。",
        pipeline_title: "数据架构（实时时间线）",
        pipeline_desc: "视频流绕过 Linux 内核瓶颈，通过 x86 例程直接写入内存缓冲区。",
        bench_title: "基准测试：I/O 吞吐量 (MB/s)",
        bench_calc: "计算中...",
        bench_start: "开始测试",
        bench_opt: "低级优化：内存缓冲区刷新速度提高 +300%。",
        cloud_title: "集中式云遥测",
        cloud_spacetime: "时空："
      },
      nfc: {
        tag_idle: "物理数字体验",
        tag_tapping: "正在读取标签...",
        tag_showing: "我们连接成功了😊",
        title: "NFC 智能作品集",
        desc: "用于联系人共享的硬件-软件生态系统。开发了一个超轻量级网络应用程序，针对物理 NFC 卡“点击”时的即时加载进行了优化。这个想法来自于我对传统名片的思考（我曾经收集过名片）。我一直对从一个人或一家餐厅收到名片，并看到他们风格的精美和吸引力感到着迷。所以我想创建一个可以通过简单的手势共享的数字版本，无需应用程序或缓慢的连接。我的关键词是简单且所有人都可以使用，同时不失去与他人分享的那种感觉。",
        list1: "通过 Web NFC API 编写安全的 NDEF 有效负载。",
        list2: "物理卡片的图形设计工程。",
        list3: "针对缓慢的 4G/5G 移动连接对网络资产进行极致优化。",
        card_type: "NFC 卡片",
        prompt: "👆 用智能手机“点击”以读取它",
        reading: "读取中...",
        reset: "移开手机"
      }
    }
  }
};