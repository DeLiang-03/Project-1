import { SorterItem, PcComponent, InstructionLine, QuizQuestion } from '../types';

export const SORTER_ITEMS: SorterItem[] = [
  {
    id: 'kb',
    name: 'Mechanical Keyboard',
    type: 'hardware',
    subCategory: 'input',
    emoji: '⌨️',
    fact: 'Input Hardware: It uses mechanical spring switches to send keystroke electrical signals to the CPU.',
    detailedExplanation: 'You can touch and hold a keyboard. Its physical switches convert finger presses into binary signals (0s and 1s).'
  },
  {
    id: 'mc',
    name: 'Minecraft Game',
    type: 'software',
    subCategory: 'application',
    emoji: '⛏️',
    fact: 'Application Software: Over 500,000 lines of Java code instructing the computer how to render blocks.',
    detailedExplanation: 'Minecraft has no physical weight. It is digital code and assets loaded from storage into RAM to be processed by the CPU and GPU.'
  },
  {
    id: 'mouse',
    name: 'Optical Gaming Mouse',
    type: 'hardware',
    subCategory: 'input',
    emoji: '🖱️',
    fact: 'Input Hardware: Uses an LED sensor and optical camera to track physical hand movement across a desk.',
    detailedExplanation: 'A mouse is physical equipment you plug in via USB or Bluetooth. Without mouse hardware, pointer control is impossible.'
  },
  {
    id: 'chrome',
    name: 'Google Chrome Browser',
    type: 'software',
    subCategory: 'application',
    emoji: '🌐',
    fact: 'Application Software: A web browser program that translates HTML, CSS, and JavaScript into interactive web pages.',
    detailedExplanation: 'Chrome is an executable program. You download and install it onto your SSD; it is composed strictly of digital software instructions.'
  },
  {
    id: 'ssd',
    name: 'NVMe M.2 SSD',
    type: 'hardware',
    subCategory: 'storage',
    emoji: '💾',
    fact: 'Storage Hardware: Physical silicon NAND flash memory chips that retain data even when power is shut off.',
    detailedExplanation: 'An SSD is a tangible circuit board with memory chips. It stores your games, photos, and operating system permanently.'
  },
  {
    id: 'os',
    name: 'Windows 11 / macOS / Linux',
    type: 'software',
    subCategory: 'system',
    emoji: '🪟',
    fact: 'System Software: The master Operating System that manages all computer hardware and lets software run.',
    detailedExplanation: 'The OS is the most crucial software on your device. It acts as the translator between human applications and raw silicon hardware.'
  },
  {
    id: 'monitor',
    name: '4K Display Monitor',
    type: 'hardware',
    subCategory: 'output',
    emoji: '🖥️',
    fact: 'Output Hardware: Millions of tiny physical liquid crystal or OLED pixels that emit light to show pictures.',
    detailedExplanation: 'A monitor displays visual information sent to it from the GPU via HDMI or DisplayPort cables. You can touch its frame and screen.'
  },
  {
    id: 'roblox',
    name: 'Roblox Client & Studio',
    type: 'software',
    subCategory: 'application',
    emoji: '🎮',
    fact: 'Application Software: A digital game engine and multiplayer sandbox written in C++ and Lua scripts.',
    detailedExplanation: 'Roblox is interactive code running in memory. The worlds you visit exist as digital instructions and network packets.'
  },
  {
    id: 'webcam',
    name: 'Full HD Webcam',
    type: 'hardware',
    subCategory: 'input',
    emoji: '📷',
    fact: 'Input Hardware: Glass lenses and a CMOS camera sensor that convert incoming light into digital video data.',
    detailedExplanation: 'The webcam is a physical peripheral mounted on your monitor or laptop lid. It feeds visual data into the computer.'
  },
  {
    id: 'cpu_chip',
    name: 'Intel / AMD Processor Chip',
    type: 'hardware',
    subCategory: 'input',
    emoji: '🧠',
    fact: 'Core Hardware: A silicon wafer containing over 10 billion microscopic microscopic transistors!',
    detailedExplanation: 'The CPU is the central processing unit chip sitting inside a socket on the motherboard. It physically executes electrical logic.'
  },
  {
    id: 'spotify',
    name: 'Spotify Music App',
    type: 'software',
    subCategory: 'application',
    emoji: '🎵',
    fact: 'Application Software: Streams compressed digital audio data over the internet and sends it to the sound driver.',
    detailedExplanation: 'Spotify is software. It plays music through your speakers (which are hardware).'
  },
  {
    id: 'headphones',
    name: 'Noise-Canceling Headphones',
    type: 'hardware',
    subCategory: 'output',
    emoji: '🎧',
    fact: 'Output Hardware: Physical electromagnetic drivers that vibrate air molecules to create sound waves.',
    detailedExplanation: 'Headphones take electrical audio signals and turn them into sound vibrations you can physically hear.'
  },
  {
    id: 'firmware',
    name: 'Motherboard BIOS / UEFI',
    type: 'software',
    subCategory: 'system',
    emoji: '⚙️',
    fact: 'System Software (Firmware): Low-level software hard-coded into ROM to wake up hardware when you press power.',
    detailedExplanation: 'Even though it is stored on a chip, BIOS is computer code (instructions) that tests your RAM and boots up the Operating System.'
  },
  {
    id: 'gpu_card',
    name: 'Nvidia RTX Graphics Card',
    type: 'hardware',
    subCategory: 'output',
    emoji: '🎨',
    fact: 'Hardware: A heavy circuit board equipped with a heatsink, high-speed GDDR RAM, cooling fans, and GPU chip.',
    detailedExplanation: 'A graphics card is a physical expansion board you plug into the PCIe slot of your motherboard.'
  },
  {
    id: 'python',
    name: 'Python Programming Language',
    type: 'software',
    subCategory: 'application',
    emoji: '🐍',
    fact: 'Software: An interpreter that reads human-readable code and converts it into machine instructions.',
    detailedExplanation: 'Programming languages and compilers are pure software tools used to write new programs and apps.'
  },
  {
    id: 'printer',
    name: 'Color Inkjet Printer',
    type: 'hardware',
    subCategory: 'output',
    emoji: '🖨️',
    fact: 'Output Hardware: Motors, print heads, and nozzles that physically spray ink droplets onto paper.',
    detailedExplanation: 'Printers produce physical hard-copy documents from digital files.'
  }
];

export const PC_COMPONENTS: PcComponent[] = [
  {
    id: 'cpu',
    name: 'CPU (Central Processing Unit)',
    shortName: 'Processor',
    icon: '🧠',
    role: 'The primary brain of the computer that carries out calculations and instructions.',
    analogyTitle: 'THE MASTER CHEF & BRAIN',
    analogy: 'Imagine a busy restaurant kitchen. The CPU is the Head Chef. The chef takes recipe instructions from the counter (RAM), cooks the dishes (executes math and logic), and serves the results!',
    description: 'The CPU performs billions of Fetch-Decode-Execute cycles per second. It contains the Arithmetic Logic Unit (ALU) for math, the Control Unit (CU) to orchestrate tasks, and ultra-fast Cache memory.',
    funFact: 'A modern 3.5 GHz CPU ticks 3,500,000,000 times every second. In the time it takes you to blink once, a CPU has completed nearly 1 billion steps!',
    keySpecs: [
      { label: 'Clock Speed', value: '3.0 GHz – 5.5 GHz' },
      { label: 'Cores', value: '4 to 24 Cores' },
      { label: 'Key Role', value: 'Fetch, Decode, Execute' },
      { label: 'Volatility', value: 'Processes active data in registers' }
    ],
    connections: ['RAM via Memory Bus', 'Motherboard Socket', 'Cooling System']
  },
  {
    id: 'ram',
    name: 'RAM (Random Access Memory)',
    shortName: 'Working Memory',
    icon: '⚡',
    role: 'Ultra-fast, temporary workspace memory holding active programs and browser tabs.',
    analogyTitle: 'THE STUDY DESK / KITCHEN COUNTER',
    analogy: 'Think of RAM as the surface of your school desk. When working on homework, you place your books, pencils, and calculator on the desk for instant reach. A bigger desk lets you keep more tabs open without slowing down. But when you leave class (power off), the desk is cleared completely!',
    description: 'RAM is volatile memory. Reading from RAM takes only ~60 nanoseconds (millions of times faster than opening a file from a slow drive). However, the moment electrical power is turned off, every byte stored in RAM vanishes instantly.',
    funFact: 'Why is it called "Random Access"? Because the CPU can jump straight to any memory address in RAM at the exact same lightning-fast speed, without rewinding!',
    keySpecs: [
      { label: 'Capacity', value: '8 GB – 32 GB typical' },
      { label: 'Transfer Speed', value: '3200 MT/s – 6400 MT/s' },
      { label: 'Volatility', value: 'Volatile (Erased on power-off)' },
      { label: 'Speed Rank', value: '2nd fastest after CPU cache' }
    ],
    connections: ['CPU via Dual-Channel Bus', 'Motherboard DIMM Slots']
  },
  {
    id: 'ssd',
    name: 'Storage (SSD / Hard Drive)',
    shortName: 'Long-term Storage',
    icon: '🗄️',
    role: 'Permanent, non-volatile storage holding your games, documents, and the operating system.',
    analogyTitle: 'THE GIANT WAREHOUSE / BOOKSHELF',
    analogy: 'Storage is your school backpack or home bookshelf. It holds everything safely overnight, during summer vacation, or when the computer is unplugged. It is bigger than your desk (RAM), but you have to walk over to get items before using them.',
    description: 'Modern SSDs (Solid State Drives) use flash memory chips with zero moving parts, making them silent and impervious to physical bumps. Older HDDs used magnetic spinning platters with a read/write mechanical arm.',
    funFact: 'An NVMe SSD can read over 7,000 megabytes per second! That means you could load an entire HD movie into memory in less than half a second.',
    keySpecs: [
      { label: 'Capacity', value: '512 GB – 4 TB' },
      { label: 'Volatility', value: 'Non-Volatile (Safe without power)' },
      { label: 'Technology', value: 'Silicon 3D NAND Flash' },
      { label: 'Durability', value: 'No moving parts' }
    ],
    connections: ['Motherboard via M.2 NVMe PCIe or SATA cables']
  },
  {
    id: 'gpu',
    name: 'GPU (Graphics Processing Unit)',
    shortName: 'Graphics Card',
    icon: '🎨',
    role: 'Massively parallel processor dedicated to rendering 3D graphics, game physics, and video.',
    analogyTitle: 'THE SPECIALIST 3D ARTIST TEAM',
    analogy: 'While the CPU is one genius mathematician doing hard complex problems one-by-one, the GPU is an army of 4,000 miniature artists all coloring different pixels on the screen at the exact same millisecond!',
    description: 'Your screen has over 2 million pixels (1080p) or 8.3 million pixels (4K). The GPU calculates the exact light, shadows, reflections, and positions of 3D objects in games 60 to 240 times every second.',
    funFact: 'GPUs are also used today to train Artificial Intelligence models like ChatGPT and Gemini because AI requires millions of simultaneous simple math operations!',
    keySpecs: [
      { label: 'Cores', value: '2,000 – 16,000 Stream Cores' },
      { label: 'VRAM', value: '8 GB – 24 GB GDDR6' },
      { label: 'Target', value: 'Ray Tracing, Shaders, 3D Gaming' },
      { label: 'Display Ports', value: 'HDMI 2.1 & DisplayPort 1.4' }
    ],
    connections: ['PCIe x16 Slot', 'Monitor via HDMI/DP', 'Dedicated PCIe Power']
  },
  {
    id: 'mobo',
    name: 'Motherboard',
    shortName: 'Main Board',
    icon: '🛣️',
    role: 'The main circuit board that interconnects all components and provides power and communication paths.',
    analogyTitle: 'THE HIGHWAY & NERVOUS SYSTEM',
    analogy: 'The Motherboard is like a bustling metropolis highway network and the human nervous system combined. It gives every component a home and lets electrical messages travel between CPU, RAM, and SSD at light speed.',
    description: 'Contains copper printed circuit traces (buses), the CPU socket, RAM slots, PCIe expansion slots, BIOS chip, voltage regulation modules (VRMs), and back-panel ports (USB, audio, LAN).',
    funFact: 'A typical motherboard contains 6 to 12 stacked microscopic layers of copper circuitry pressed inside fiberglass to prevent wires from crossing and short-circuiting!',
    keySpecs: [
      { label: 'Form Factors', value: 'ATX, Micro-ATX, Mini-ITX' },
      { label: 'Chipset', value: 'Manages data lanes & USB' },
      { label: 'Bus Speeds', value: 'PCIe Gen 4 / Gen 5 (64 GB/s)' },
      { label: 'Firmware', value: 'UEFI / BIOS ROM' }
    ],
    connections: ['All components plug directly into or connect to it']
  },
  {
    id: 'psu',
    name: 'Power Supply Unit (PSU)',
    shortName: 'Power Supply',
    icon: '❤️',
    role: 'Converts wall AC electricity into smooth, safe DC voltages (12V, 5V, 3.3V) for delicate microchips.',
    analogyTitle: 'THE HEART & CIRCULATORY SYSTEM',
    analogy: 'The PSU is the beating heart of your computer. Just like your heart pumps clean oxygenated blood through veins to every muscle and organ, the PSU pumps regulated electrical current through color-coded cables to every chip.',
    description: 'Wall outlets provide dangerous high-voltage alternating current (120V or 230V AC). Computer silicon chips can only survive low-voltage direct current (12V, 5V, 3.3V DC). The PSU transforms and filters this power with high efficiency.',
    funFact: 'Efficiency ratings like "80 PLUS Gold" mean the power supply converts at least 90% of electricity from the wall into usable power, wasting less as heat!',
    keySpecs: [
      { label: 'Wattage', value: '550W – 1000W+' },
      { label: 'Outputs', value: '+12V (CPU/GPU), +5V, +3.3V' },
      { label: 'Safety Protections', value: 'Over-voltage, short-circuit' },
      { label: 'Efficiency', value: '80 PLUS Bronze / Gold / Platinum' }
    ],
    connections: ['Wall socket, Motherboard 24-pin, CPU 8-pin, GPU PCIe 8-pin']
  },
  {
    id: 'cooling',
    name: 'CPU Cooler & Case Fans',
    shortName: 'Thermal Cooling',
    icon: '❄️',
    role: 'Dissipates intense heat generated by billions of microscopic transistor switches.',
    analogyTitle: 'THE PERSONAL AIR CONDITIONER & SWEAT',
    analogy: 'When you sprint in gym class, your body gets hot and sweats to cool down. When a CPU crunches heavy game code, billions of electric sparks produce heat hot enough to boil water! Coolers blow cool air across metal fins to keep it frostily calm.',
    description: 'Heatpipes filled with liquid absorb heat from the CPU surface and transfer it to hundreds of aluminum fins, where a spinning fan exhausts the warm air out of the computer case.',
    funFact: 'If a modern CPU had no cooler attached, safety sensors would trigger automatic thermal shutdown in less than 3 seconds to prevent the silicon from melting!',
    keySpecs: [
      { label: 'Types', value: 'Air Cooler / AIO Liquid Cooler' },
      { label: 'Target Temp', value: 'Under 75°C under heavy gaming' },
      { label: 'RPM', value: '800 – 2200 RPM' },
      { label: 'Thermal Paste', value: 'Eliminates microscopic air pockets' }
    ],
    connections: ['Mounted directly on CPU socket with 4-pin PWM header']
  }
];

export const CPU_PROGRAM_PRESETS: { name: string; description: string; instructions: InstructionLine[] }[] = [
  {
    name: 'Addition (5 + 3)',
    description: 'Load two numbers from memory into registers, use the ALU to calculate the sum, and display it.',
    instructions: [
      { id: 0, code: 'LOAD 5 -> REG A', type: 'LOAD_A', operand: 5, comment: 'Fetch number 5 from RAM and store in Register A' },
      { id: 1, code: 'LOAD 3 -> REG B', type: 'LOAD_B', operand: 3, comment: 'Fetch number 3 from RAM and store in Register B' },
      { id: 2, code: 'ADD REG A + REG B', type: 'ADD', comment: 'Arithmetic Logic Unit (ALU) adds Reg A + Reg B' },
      { id: 3, code: 'PRINT RESULT', type: 'PRINT', comment: 'Send ALU output value (8) to the display monitor' },
      { id: 4, code: 'HALT PROGRAM', type: 'HALT', comment: 'Stop CPU clock cycle safely' }
    ]
  },
  {
    name: 'Subtraction (15 - 6)',
    description: 'Subtract Register B from Register A using ALU logic.',
    instructions: [
      { id: 0, code: 'LOAD 15 -> REG A', type: 'LOAD_A', operand: 15, comment: 'Place starting number 15 into Register A' },
      { id: 1, code: 'LOAD 6 -> REG B', type: 'LOAD_B', operand: 6, comment: 'Place number 6 into Register B' },
      { id: 2, code: 'SUB REG A - REG B', type: 'SUB', comment: 'ALU subtracts: 15 - 6 = 9' },
      { id: 3, code: 'PRINT RESULT', type: 'PRINT', comment: 'Send result 9 to screen console' },
      { id: 4, code: 'HALT PROGRAM', type: 'HALT', comment: 'Execution completed' }
    ]
  },
  {
    name: 'Multiplication (4 × 7)',
    description: 'Demonstrates multiplication operation inside the CPU math engine.',
    instructions: [
      { id: 0, code: 'LOAD 4 -> REG A', type: 'LOAD_A', operand: 4, comment: 'Set operand 1 to 4' },
      { id: 1, code: 'LOAD 7 -> REG B', type: 'LOAD_B', operand: 7, comment: 'Set operand 2 to 7' },
      { id: 2, code: 'MUL REG A * REG B', type: 'MULTIPLY', comment: 'ALU multiplier array calculates: 4 × 7 = 28' },
      { id: 3, code: 'PRINT RESULT', type: 'PRINT', comment: 'Display 28 to student screen' },
      { id: 4, code: 'HALT PROGRAM', type: 'HALT', comment: 'End of instructions' }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'Hardware',
    question: 'Which of the following is physical HARDWARE that you can physically touch and hold in your hands?',
    options: [
      'A YouTube Video File',
      'Solid State Drive (SSD)',
      'Google Classroom App',
      'Windows 11 Operating System'
    ],
    correctIndex: 1,
    explanation: 'An SSD is a tangible piece of hardware containing silicon NAND flash memory chips. YouTube videos and Windows are software code and digital data!'
  },
  {
    id: 2,
    category: 'Memory',
    question: 'Why is RAM (Random Access Memory) compared to a student’s "Study Desk"?',
    options: [
      'Because it stores assignments safely for 10 years without power',
      'Because it is fast, temporary workspace that is completely cleared when power turns off',
      'Because it prints homework sheets onto real paper',
      'Because it controls the cooling fan speeds'
    ],
    correctIndex: 1,
    explanation: 'RAM is volatile memory. It holds what you are actively working on right now for instant access, but the moment you turn off the computer, everything in RAM clears!'
  },
  {
    id: 3,
    category: 'CPU & Logic',
    question: 'What are the 3 fundamental steps of the CPU Machine Cycle?',
    options: [
      'Click, Double-Click, Drag',
      'Download, Install, Uninstall',
      'Fetch, Decode, Execute',
      'Save, Copy, Paste'
    ],
    correctIndex: 2,
    explanation: 'The CPU constantly repeats: 1. FETCH an instruction from RAM, 2. DECODE what operation it means, and 3. EXECUTE the operation with its ALU!'
  },
  {
    id: 4,
    category: 'Software',
    question: 'Which category of software does Microsoft Windows, Apple macOS, or Android belong to?',
    options: [
      'Input Hardware Cable',
      'Operating System (System Software)',
      'Webcam Video Driver Only',
      'GPU Silicon Transistor'
    ],
    correctIndex: 1,
    explanation: 'The Operating System is System Software. It acts as the master conductor, managing all hardware resources and allowing applications to run.'
  },
  {
    id: 5,
    category: 'CPU & Logic',
    question: 'Inside the CPU, which sub-unit is responsible for doing all the math (addition, subtraction) and logical decisions?',
    options: [
      'ALU (Arithmetic Logic Unit)',
      'HDMI Port',
      'Power Cable Plug',
      'Optical Laser Lens'
    ],
    correctIndex: 0,
    explanation: 'The ALU (Arithmetic Logic Unit) is the mathematical calculating engine of the processor.'
  },
  {
    id: 6,
    category: 'Hardware',
    question: 'What happens if a computer runs completely out of available RAM while playing a game?',
    options: [
      'The monitor immediately explodes',
      'The computer slows down drastically as it relies on slower disk storage (paging)',
      'The keyboard stops typing vowels',
      'The CPU automatically doubles its clock speed'
    ],
    correctIndex: 1,
    explanation: 'When RAM is full, the OS has to swap data onto the much slower SSD/Hard Drive (virtual memory/paging), causing major lag and stutters!'
  }
];

export const TEACHER_GUIDE_STEPS = [
  {
    step: 1,
    time: '5 mins',
    title: 'Warm-Up: Hardware vs. Software Arcade',
    icon: '🕹️',
    description: 'Project the Arcade tab onto the classroom smartboard or TV.',
    discussionPrompts: [
      'Ask the class: "If I throw it out the window, does it smash? (Hardware) Or is it intangible ideas and code? (Software)"',
      'Have students shout out "HARDWARE!" or "SOFTWARE!" as items appear.',
      'Highlight tricky items like BIOS/Firmware and Operating Systems.'
    ]
  },
  {
    step: 2,
    time: '10 mins',
    title: 'PC Anatomy: The Relatable Analogies',
    icon: '🖥️',
    description: 'Click each component in the X-Ray Explorer to examine its real-life superpower.',
    discussionPrompts: [
      'Ask: "Who knows the difference between RAM and Storage?"',
      'Use the Desk vs. Bookshelf analogy: Desk = RAM (active work, fast, clears when you leave). Bookshelf = SSD (long-term archive).',
      'Contrast the CPU (Head Chef) with the GPU (Army of 4,000 artists drawing pixels).'
    ]
  },
  {
    step: 3,
    time: '10 mins',
    title: 'Micro-CPU Sim: Fetch, Decode, Execute',
    icon: '🤖',
    description: 'Slow-motion demonstration of how code commands real silicon circuits.',
    discussionPrompts: [
      'Click "Step Next" slowly through the cycle.',
      'Show students: "See that line `LOAD 5`? Watch the Program Counter advance and Register A light up with the number 5!"',
      'Emphasize that every computer game is just billions of these tiny math steps happening every second.'
    ]
  },
  {
    step: 4,
    time: '10 mins',
    title: 'Boss Battle & Junior Scientist Certificate',
    icon: '🏆',
    description: 'Students complete the 6-question quiz independently or in teams.',
    discussionPrompts: [
      'Every student who finishes types their name to generate their customized printable certificate!',
      'Print certificates or take screenshots to celebrate classroom achievement.'
    ]
  }
];
