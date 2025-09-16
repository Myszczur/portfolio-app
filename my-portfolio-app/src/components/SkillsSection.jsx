/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SkillCard from "./skills/SkillCard";
import { FaJava, FaReact, FaDocker, FaGitAlt } from "react-icons/fa";
import {
  SiSpring,
  SiPostgresql,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiMysql,
  SiMongodb,
  SiApachekafka,
  SiAstro,
  SiMaterialformkdocs,
} from "react-icons/si";
import { DiMsqlServer } from "react-icons/di";

const skills = {
  backend: [
    { name: "Java", icon: <FaJava size={60} /> },
    { name: "Spring Boot", icon: <SiSpring size={50} /> },
    { name: "PostgreSQL", icon: <SiPostgresql size={50} /> },
    { name: "MySQL", icon: <SiMysql size={60} /> },
    { name: "SQL Server", icon: <DiMsqlServer size={60} /> },
    { name: "MongoDB", icon: <SiMongodb size={60} /> },
  ],
  frontend: [
    { name: "React", icon: <FaReact size={60} /> },
    { name: "Astro", icon: <SiAstro size={50} /> },
    { name: "JavaScript", icon: <SiJavascript size={50} /> },
    // { name: "TypeScript", icon: <SiTypescript size={50} /> },
    { name: "HTML5", icon: <SiHtml5 size={50} /> },
    { name: "CSS3", icon: <SiCss3 size={50} /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss size={50} /> },
    { name: "Material UI", icon: <SiMaterialformkdocs size={50} /> },
  ],
  tools: [
    { name: "Docker", icon: <FaDocker size={50} /> },
    { name: "Git", icon: <FaGitAlt size={50} /> },
    { name: "Kafka", icon: <SiApachekafka size={50} /> },
  ],
};

const SkillSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
  });

  const containerVariants = {
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <section
      ref={ref}
      id="skills"
      className="w-full py-20 lg:py-32 bg-transparent text-gray-200"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl lg:text-5xl font-bold text-center mb-20 text-white"
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Mój Arsenał Technologiczny
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
          {/* --- KATEGORIA BACKEND --- */}
          <motion.div
            className="flex flex-col items-center"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <h3 className="text-2xl font-semibold mb-8 text-green-300">
              Backend & Bazy Danych
            </h3>
            <div className="flex flex-wrap justify-center gap-8">
              {skills.backend.map((skill) => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  variants={itemVariants}
                />
              ))}
            </div>
          </motion.div>

          {/* --- KATEGORIA FRONTEND --- */}
          <motion.div
            className="flex flex-col items-center"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-8 text-green-300">
              Frontend
            </h3>
            <div className="flex flex-wrap justify-center gap-8">
              {skills.frontend.map((skill) => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  variants={itemVariants}
                />
              ))}
            </div>
          </motion.div>

          {/* --- KATEGORIA NARZĘDZIA --- */}
          <motion.div
            className="flex flex-col items-center"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold mb-8 text-green-300">
              Narzędzia & DevOps
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              {skills.tools.map((skill) => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  variants={itemVariants}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillSection;
