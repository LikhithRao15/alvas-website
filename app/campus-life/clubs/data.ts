export interface Club {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  students?: number;
  motive?: string;
  paragraphs?: string[];
  activities?: string[];
}

export const TECHNICAL_CLUBS: Club[] = [
  {
    id: "robotics",
    name: "Robotics Club",
    category: "Engineering",
    description:
      "Dive into the world of autonomous systems and mechanical innovation. Our members design, build, and program cutting-edge robots for competitions and real-world applications.",
    image:
      "https://images.unsplash.com/photo-1563207153-f403bf289096?w=1200&h=600&fit=crop",
    students: 120,
    motive:
      "To empower students with hands-on experience in robotics and automation.",
    paragraphs: [
      "The Robotics Club at AIET is a vibrant hub where students from various engineering disciplines converge to transform theoretical knowledge into tangible robotic solutions. We focus on fostering a culture of innovation by providing access to state-of-the-art hardware and a collaborative environment. Members are encouraged to explore diverse fields such as autonomous navigation, computer vision, and mechanical design, ensuring a holistic understanding of modern robotics. Our community is built on the foundation of peer-to-peer learning, where experienced seniors mentor juniors, creating a sustainable ecosystem of technical excellence and shared passion.",
      "Beyond the technical aspects, our club plays a pivotal role in preparing students for the competitive landscape of the technology industry. We regularly organize internal hackathons and design challenges that simulate real-world problem-solving scenarios. This hands-on approach helps students develop critical thinking, project management, and teamwork skills that are highly valued by employers globally. By participating in national and international robotics competitions, our members gain exposure to cutting-edge trends and network with innovators from around the world, making them well-rounded professionals capable of leading future industrial revolutions.",
      "The motive of the Robotics Club is deeply rooted in social impact and sustainable development. We believe that robotics technology can be leveraged to solve pressing community issues, such as agricultural automation and disaster management. Our long-term goal is to build robots that not only win competitions but also contribute to the betterment of society. Through outreach programs and workshops for local schools, we aspire to inspire the next generation of engineers and entrepreneurs. Joining the Robotics Club is not just about building machines; it's about becoming part of a movement that aims to shape a smarter and more efficient world for everyone.",
    ],
    activities: [
      "Annual Robot Combat",
      "Arduino Workshops",
      "Industrial IA Visits",
      "Freshman Mentorship",
    ],
  },
  {
    id: "coding",
    name: "Coding Club",
    category: "Computer Science",
    description:
      "Master the art of programming through collaborative learning and challenging projects. We cover everything from fundamental algorithms to advanced software architecture.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop",
    students: 250,
    motive:
      "To foster a community of passionate developers and problem solvers.",
    paragraphs: [
      "The Coding Club is AIET's premier platform for students who want to excel in the ever-evolving world of software development. Our primary goal is to bridge the gap between academic theory and industry practice by exposing members to modern technologies and development workflows. Whether it's competitive programming, full-stack development, or mobile apps, we provide a structured path for every skill level. The club serves as a collaborative incubator where ideas are turned into code, and bugs are seen as opportunities for learning, ensuring that every member develops a resilient and logical mindset essential for high-level technical roles.",
      "We believe that the best way to learn to code is by building real projects. To this end, the Coding Club facilitates numerous team-based projects that address campus needs and local business challenges. This not only gives students a solid portfolio but also teaches them the nuances of Version Control, Agile methodologies, and software lifecycle management. Regular code review sessions and technical seminars by alumni working in top-tier tech companies provide invaluable insights into the professional world. Our culture is one of constant curiosity and relentless pursuit of efficient, scalable, and clean code implementation for various platforms.",
      "The motive of the Coding Club is to create a culture of technical entrepreneurship and open-source contribution. We want our members to be more than just employees; we want them to be creators who can start their own tech ventures or contribute significantly to global software communities. By hosting annual hackathons and coding marathons, we create an intense yet fun atmosphere that pushes students to their creative limits. Joining the Coding Club means being part of a supportive network of tech enthusiasts who are all driven by the desire to use logic and creativity to build digital solutions that make a difference in people's lives.",
    ],
    activities: [
      "Algorithm Challenges",
      "24-Hour Hackathon",
      "Open Source Month",
      "Industry Webinars",
    ],
  },
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    category: "Data Science",
    description:
      "Unlock the potential of artificial intelligence and deep learning technologies. Members work on neural networks, NLP, and computer vision projects.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
    students: 85,
    motive:
      "To explore the frontiers of AI and implement intelligent solutions.",
    paragraphs: [
      "The AI & Machine Learning Club at AIET is dedicated to exploring one of the most transformative technologies of our age. Our focus is on providing students with a deep understanding of data science, neural networks, and the mathematical foundations that power intelligent systems. In an era where data is the new oil, we equip our members with the tools to extract meaningful insights and build predictive models that can solve complex problems. The club emphasizes a research-oriented approach, encouraging students to stay updated with the latest papers and contribute to ongoing academic and industrial discussions in the vast field of AI.",
      "Our members engage in hands-on projects ranging from simple regression models to sophisticated computer vision and natural language processing applications. By working with large datasets and modern libraries like TensorFlow and PyTorch, students gain practical experience that is highly sought after in today's job market. We also host 'AI Ethics' sessions to ensure that our future developers understand the social and moral implications of the algorithms they build. This dual focus on technical mastery and ethical responsibility prepares our members to be leaders in the global tech community, capable of building AI that is both powerful and fair.",
      "The motive of the AI & ML Club is to empower students to build intelligent systems that can augment human capabilities and solve global challenges. We believe that AI should be accessible to all, and we work toward democratizing these technologies through simplified workshops and collaborative projects. Our long-term vision is to establish a research hub where students can work on cutting-edge AI problems that have real-world applications in healthcare, environment, and finance. Being part of this club means being at the cutting edge of technology, constantly learning, and striving to make the world a smarter place through the magic of data and algorithms.",
    ],
    activities: [
      "ML Project Showcases",
      "Kaggle Study Groups",
      "AI Ethics Debates",
      "Neural Network Labs",
    ],
  },
  {
    id: "web-dev",
    name: "Web Development Society",
    category: "Technology",
    description:
      "Create stunning, responsive websites and web applications using modern frameworks. Learn full-stack development, from front-end to back-end.",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=600&fit=crop",
    students: 150,
    motive:
      "To master modern web technologies and build impactful digital products.",
    paragraphs: [
      "The Web Development Society is a creative and technical sanctuary for those who want to build the digital infrastructure of tomorrow. We focus on the entire spectrum of web technologies, from the aesthetics of UI/UX design to the complexity of scalable back-end architectures. Our community is built on the belief that a website is more than just a page; it's an experience. Members learn to use modern tools like React, Next.js, and Node.js through a series of structured modules that guide them from the basics of HTML/CSS to the deployment of complex, real-time web applications on global cloud platforms.",
      "Practicality is at the heart of our society. We actively encourage our members to take on freelance projects and build websites for local organizations, giving them early exposure to client requirements and project deadlines. This real-world experience is complemented by internal 'Design Sprints' and 'Performance Optimization' workshops where members compete to build the fastest and most intuitive users interfaces. By fostering a culture of peer-review and continuous feedback, we ensure that every line of code written by our members meets high industry standards for accessibility, SEO, and performance across all modern devices and browsers.",
      "The motive of the Web Development Society is to create a generation of developers who prioritize the user experience and build a more accessible web for everyone. We believe that a well-designed web application can empower communities and drive business growth like no other medium. Our goal is to create a collaborative environment where designers and developers work in harmony to push the boundaries of what's possible on the web. By staying at the forefront of web innovation, our members are prepared to lead digital transformations in any industry. Joining us means learning to build the future of the internet, one pixel and one line of code at a time.",
    ],
    activities: [
      "Modern Framework Labs",
      "UI/UX Design Sprints",
      "Real Client Projects",
      "Portfolio Bootcamps",
    ],
  },
  {
    id: "cyber-security",
    name: "Cybersecurity Club",
    category: "Security",
    description:
      "Defend digital infrastructure and learn ethical hacking techniques. Participate in CTF competitions and penetration testing exercises.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=600&fit=crop",
    students: 60,
    motive:
      "To create awareness about digital security and train future cyber defenders.",
    paragraphs: [
      "The Cybersecurity Club at AIET is an elite community of aspiring defenders and ethical hackers committed to securing the digital world. In an age where cyber threats are increasingly sophisticated, our mission is to provide students with the skills and mindset needed to identify vulnerabilities and protect critical infrastructure. We provide a safe and controlled environment for members to learn about network security, cryptography, and digital forensics. By emphasizing the 'Ethical' in hacking, we ensure that our students use their skills for the greater good, becoming responsible guardians of the data that drives modern society's daily functions.",
      "Our training goes beyond theory, with a heavy emphasis on 'Capture The Flag' (CTF) competitions and simulated penetration testing labs. These intense scenarios challenge members to think like attackers to build better defenses, fostering a deep understanding of common exploits and remediation techniques. We also host regular sessions on the legal and compliance aspects of cybersecurity, ensuring our members are well-versed in global data protection laws. Exposure to real-world threat intelligence and malware analysis prepares our students to enter the workforce as ready-to-act professionals who can handle high-pressure security incidents in any corporate or government setting.",
      "The motive of the Cybersecurity Club is to build a culture of digital safety and awareness that extends beyond our campus. We believe that everyone deserves to be safe online, and we actively work toward educating the broader community about personal cybersecurity through seminars and outreach. Our long-term goal is to produce skilled security researchers who can contribute to global security projects and discover vulnerabilities before they are exploited by malicious actors. By joining the Cybersecurity Club, students become part of a vital line of defense, mastering the art of digital warfare for one single purpose: to keep the digital world safe, private, and resilient for all users.",
    ],
    activities: [
      "CTF Tournaments",
      "Penetration Testing",
      "Awareness Talks",
      "Security Cert Paths",
    ],
  },
];

export const NON_TECHNICAL_CLUBS: Club[] = [
  {
    id: "debate",
    name: "Debate Society",
    category: "Communication",
    description:
      "Develop persuasive communication and critical thinking through structured argumentation. Compete in parliamentary and policy debates.",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&h=600&fit=crop",
    students: 45,
    motive: "To sharpen critical thinking and public speaking skills.",
    paragraphs: [
      "The AIET Debate Society is a sanctuary for those who believe in the power of words and the importance of reasoned discourse. We provide a platform for students to engage with complex global issues, ranging from social justice and economics to philosophy and technology. Our community is built on the principle of 'Intellectual Curiosity,' where every debate is seen as an opportunity to see the world from a different perspective. Members learn to construct well-reasoned arguments, think on their feet, and communicate with clarity and confidence, skills that are indispensable for leadership and advocacy in any professional or personal walk of life.",
      "We follow international debating formats, including British Parliamentary and World Schools styles, to ensure our members can compete on a global stage. Regular practice sessions involve research on diverse topics, fostering a deep understanding of current affairs and diverse viewpoints. The society also emphasizes the art of rebuttal and active listening, teaching students not just to speak, but to engage meaningfully with opposing ideas. This process of structured argumentation builds mental agility and emotional intelligence, enabling our members to navigate difficult conversations with grace and facts, ultimately making them more informed and compassionate citizens within our larger societal structure.",
      "The motive of the Debate Society is to revive the culture of healthy, evidence-based dialogue in an increasingly polarized world. We believe that through civil debate, we can find common ground and solve the most pressing challenges of our time. Our goal is to inspire students to use their voices to challenge the status quo and advocate for positive change. By hosting inter-collegiate championships and public speaking workshops, we aim to spread the value of critical thinking across the region. Joining the Debate Society means joining a community that values your ideas and empowers you to express them with power, integrity, and absolute conviction.",
    ],
    activities: [
      "Inter-college Championships",
      "Rhetoric Workshops",
      "Mock UN (MUN)",
      "Masterclasses",
    ],
  },
  {
    id: "drama",
    name: "Drama & Theater Club",
    category: "Performing Arts",
    description:
      "Bring stories to life on stage through powerful theatrical performances. From classical plays to contemporary productions.",
    image:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?w=1200&h=600&fit=crop",
    students: 55,
    motive: "To explore the art of storytelling through acting and stagecraft.",
    paragraphs: [
      "The Drama & Theater Club at AIET is a creative powerhouse where students explore the transformative power of performance. We are dedicated to the art of storytelling, using the stage as a canvas to reflect the human condition in all its complexity. Our members are involved in every aspect of production, from method acting and script writing to stage lighting and costume design. We believe that theater is a collaborative journey that requires total trust and vulnerability, fostering deep bonds among members as they work together to create unforgettable emotional experiences for our audiences throughout the academic year.",
      "Our repertoire includes everything from intense classical dramas to lighthearted contemporary comedies and experimental street plays. We place a high emphasis on technical training, providing workshops on voice modulation, body language, and dramatic theory. Students also learn the logistical side of theater, including production management and event coordination, giving them a comprehensive understanding of the performing arts industry. By performing in diverse settings, from the campus auditorium to public squares, our members gain the confidence to express themselves and connect with people from all walks of life, developing a profound sense of empathy.",
      "The motive of the Drama & Theater Club is to use the arts as a tool for social awareness and personal growth. We believe that performance can be a powerful mirror to society, highlighting issues that need attention and celebrating the beauty of our shared humanity. Our goal is to create a safe space for students to experiment, fail, and ultimately discover their unique creative voice. By bringing together diverse talents, we aim to enrich the cultural life of our campus and inspire our community through the magic of live performance. Joining us is an invitation to step out of your zone and find your place on the world stage.",
    ],
    activities: [
      "Annual Production",
      "Acting Improv",
      "Script Workshops",
      "Stage Design Training",
    ],
  },
  {
    id: "music",
    name: "Music Society",
    category: "Arts",
    description:
      "Express yourself through the universal language of music. Whether you play instruments, sing, or produce electronic beats.",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&h=600&fit=crop",
    students: 100,
    motive: "To unite students through the power of musical expression.",
    paragraphs: [
      "The AIET Music Society is a harmonious community where melodies transcend barriers and rhythm becomes the heartbeat of the campus. We celebrate musical diversity in all its forms, from soulful Indian classical to high-energy rock and modern electronic production. Our society provides a collaborative space for musicians to jam, compose, and record, ensuring that every talent has the resources and the audience it deserves. We believe that music is not just an art form but a universal language that can bridge cultures and bring people together in a way few other things can during their college journey.",
      "Members have access to our music studio and rehearsal rooms, where they can experiment with different instruments and genres. We regularly organize 'Battle of the Bands', 'Unplugged' sessions, and vocal masterclasses led by professional musicians. This exposure helps our students refine their technical skills and understand the nuances of live performance and studio recording. We also encourage collaboration between vocalists, instrumentalists, and electronic producers, fostering the creation of original music that reflects the unique spirit of our student body. Our culture is one of mutual respect, where every note is valued and every style is explored.",
      "The motive of the Music Society is to enrich the campus life with the therapeutic and unifying power of music. We aim to create a space where students can find solace in sound and express their deepest emotions through their craft. Our goal is to nurture a lifelong passion for music and provide a platform for the next generation of artists to shine. By organizing large-scale concerts and community music events, we strive to make music an integral part of the AIET experience. Joining the Music Society is about finding your rhythm, connecting with fellow artists, and making the kind of music that stays in the hearts of listeners long after the final note.",
    ],
    activities: [
      "Acoustic Nights",
      "Electronic Music Labs",
      "Vocal Workshops",
      "Instrumental Jams",
    ],
  },
  {
    id: "photography",
    name: "Photography Club",
    category: "Visual Arts",
    description:
      "Capture the world through your unique perspective and artistic vision. Learn professional techniques and visual storytelling.",
    image:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&h=600&fit=crop",
    students: 70,
    motive: "To master the art of visual storytelling through the lens.",
    paragraphs: [
      "The Photography Club at AIET is a community of visual storytellers dedicated to capturing the moments that define our world. We believe that every frame tells a story, and our mission is to teach students the technical and creative skills needed to tell those stories with impact. From understanding the physics of light to mastering the art of composition and post-processing, we provide a comprehensive education in the art of photography. Our members explore various genres, including street, landscape, portrait, and macro photography, developing a keen eye for detail and a unique artistic vision that sets their work apart in any visual medium.",
      "Education in our club is hands-on, featuring regular photo-walks, studio sessions, and Lightroom tutorials. We also host guest lectures by industry professionals who share their insights into the world of commercial and photojournalistic photography. These interactions give our members a realistic view of the photography industry and help them build professional portfolios. Our annual exhibition is a testament to the growth and talent of our members, providing them with a platform to showcase their best work to the wider community. We foster a culture of constructive criticism, where members learn to evaluate and improve their work through peer-review and expert guidance.",
      "The motive of the Photography Club is to freeze time and preserve the beauty, struggle, and emotion of the human experience through the lens. We believe that photography can be a powerful tool for social documentation and personal expression. Our goal is to create a generation of visual artists who are technically proficient and creatively bold. By documenting the life at AIET and beyond, our members provide a visual legacy for our institution. Joining the Photography Club is an invitation to see the world differently, to find beauty in the mundane, and to master the craft of creating images that provoke thought and inspire emotion in all who see them.",
    ],
    activities: [
      "Nature & Urban Walks",
      "Editing Tutorials",
      "Annual Exhibition",
      "Guest Lectures",
    ],
  },
];

export const ALL_CLUBS = [...TECHNICAL_CLUBS, ...NON_TECHNICAL_CLUBS];
