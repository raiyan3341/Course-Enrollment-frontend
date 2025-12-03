import React from "react";
import { motion } from "framer-motion";

const successData = [
  { id: 1, title: "Over 10,000 Students Enrolled", description: "Our platform has helped thousands of students upskill and grow their careers across multiple domains.", icon: "🧑‍🎓", color: "indigo", stat: "10K+", badge: "Global Reach" },
  { id: 2, title: "95% Student Satisfaction", description: "Most of our students report excellent learning experience, practical skills, and career growth after completing our courses.", icon: "✅", color: "green", stat: "95%", badge: "Excellent Rating" },
  { id: 3, title: "Industry-Recognized Courses", description: "Our courses are designed by professionals and recognized by top companies in the tech and business industry.", icon: "🏆", color: "yellow", stat: "Top Rated", badge: "Accredited" },
  { id: 4, title: "100+ Expert Instructors", description: "Learn from certified instructors who are industry practitioners with years of experience in their respective fields.", icon: "👨‍🏫", color: "pink", stat: "100+", badge: "Industry Veterans" },
  { id: 5, title: "Career Support & Guidance", description: "We provide mentorship, resume reviews, and interview preparation to help students achieve their career goals.", icon: "💼", color: "blue", stat: "Dedicated", badge: "Mentorship" },
  { id: 6, title: "Project-Based Learning", description: "Our courses include hands-on projects to ensure students gain practical experience while learning.", icon: "💻", color: "red", stat: "Hands-on", badge: "Practical Skills" },
  { id: 7, title: "Flexible Online Learning", description: "Access our courses anytime, anywhere, and learn at your own pace with lifetime access to materials.", icon: "⏰", color: "teal", stat: "24/7", badge: "Lifetime Access" },
  { id: 8, title: "Certification After Completion", description: "Receive industry-recognized certificates upon course completion to showcase your skills to employers.", icon: "📜", color: "purple", stat: "Official", badge: "Certification" },
  { id: 9, title: "Real-World Case Studies", description: "We use real-world scenarios and case studies to help students understand practical applications.", icon: "📈", color: "orange", stat: "Case Studies", badge: "Applicable Learning" },
  { id: 10, title: "Global Community", description: "Join a thriving community of learners, connect with peers, and collaborate on projects worldwide.", icon: "🌍", color: "cyan", stat: "Worldwide", badge: "Collaboration" },
  { id: 11, title: "Career Placement Assistance", description: "We help connect students with potential employers and internship opportunities after completing courses.", icon: "🔗", color: "fuchsia", stat: "Job Ready", badge: "Placement Cell" },
  { id: 12, title: "Regular Skill Updates", description: "Stay up-to-date with the latest technologies, tools, and industry trends through our constantly updated content.", icon: "🔄", color: "lime", stat: "Up-to-Date", badge: "Content Refresh" },
  { id: 13, title: "Affordable Learning", description: "High-quality courses at affordable prices, with scholarships and discounts available for eligible students.", icon: "💰", color: "emerald", stat: "Value Deal", badge: "Budget Friendly" },
  { id: 14, title: "Interactive Learning Experience", description: "Engage with interactive quizzes, coding exercises, and discussion forums for a better learning experience.", icon: "💡", color: "sky", stat: "Interactive", badge: "Better Engagement" },
  { id: 15, title: "Trusted by Professionals", description: "Thousands of professionals worldwide rely on our courses to advance their careers and enhance their skills.", icon: "🌟", color: "amber", stat: "Trusted", badge: "Pro Endorsed" },
];

const getDynamicClasses = (color) => {
    const colorMap = {
        indigo: { stat: "text-indigo-400", title: "text-indigo-300", border: "border-indigo-500", shadow: "shadow-2xl shadow-indigo-900/60", hover: "hover:shadow-indigo-500/50", iconBg: "bg-indigo-900/50", badge: "bg-indigo-600/50 text-indigo-100" },
        green: { stat: "text-green-400", title: "text-green-300", border: "border-green-500", shadow: "shadow-2xl shadow-green-900/60", hover: "hover:shadow-green-500/50", iconBg: "bg-green-900/50", badge: "bg-green-600/50 text-green-100" },
        yellow: { stat: "text-yellow-400", title: "text-yellow-300", border: "border-yellow-500", shadow: "shadow-2xl shadow-yellow-900/60", hover: "hover:shadow-yellow-500/50", iconBg: "bg-yellow-900/50", badge: "bg-yellow-600/50 text-yellow-100" },
        pink: { stat: "text-pink-400", title: "text-pink-300", border: "border-pink-500", shadow: "shadow-2xl shadow-pink-900/60", hover: "hover:shadow-pink-500/50", iconBg: "bg-pink-900/50", badge: "bg-pink-600/50 text-pink-100" },
        blue: { stat: "text-blue-400", title: "text-blue-300", border: "border-blue-500", shadow: "shadow-2xl shadow-blue-900/60", hover: "hover:shadow-blue-500/50", iconBg: "bg-blue-900/50", badge: "bg-blue-600/50 text-blue-100" },
        red: { stat: "text-red-400", title: "text-red-300", border: "border-red-500", shadow: "shadow-2xl shadow-red-900/60", hover: "hover:shadow-red-500/50", iconBg: "bg-red-900/50", badge: "bg-red-600/50 text-red-100" },
        teal: { stat: "text-teal-400", title: "text-teal-300", border: "border-teal-500", shadow: "shadow-2xl shadow-teal-900/60", hover: "hover:shadow-teal-500/50", iconBg: "bg-teal-900/50", badge: "bg-teal-600/50 text-teal-100" },
        purple: { stat: "text-purple-400", title: "text-purple-300", border: "border-purple-500", shadow: "shadow-2xl shadow-purple-900/60", hover: "hover:shadow-purple-500/50", iconBg: "bg-purple-900/50", badge: "bg-purple-600/50 text-purple-100" },
        orange: { stat: "text-orange-400", title: "text-orange-300", border: "border-orange-500", shadow: "shadow-2xl shadow-orange-900/60", hover: "hover:shadow-orange-500/50", iconBg: "bg-orange-900/50", badge: "bg-orange-600/50 text-orange-100" },
        cyan: { stat: "text-cyan-400", title: "text-cyan-300", border: "border-cyan-500", shadow: "shadow-2xl shadow-cyan-900/60", hover: "hover:shadow-cyan-500/50", iconBg: "bg-cyan-900/50", badge: "bg-cyan-600/50 text-cyan-100" },
        fuchsia: { stat: "text-fuchsia-400", title: "text-fuchsia-300", border: "border-fuchsia-500", shadow: "shadow-2xl shadow-fuchsia-900/60", hover: "hover:shadow-fuchsia-500/50", iconBg: "bg-fuchsia-900/50", badge: "bg-fuchsia-600/50 text-fuchsia-100" },
        lime: { stat: "text-lime-400", title: "text-lime-300", border: "border-lime-500", shadow: "shadow-2xl shadow-lime-900/60", hover: "hover:shadow-lime-500/50", iconBg: "bg-lime-900/50", badge: "bg-lime-600/50 text-lime-100" },
        emerald: { stat: "text-emerald-400", title: "text-emerald-300", border: "border-emerald-500", shadow: "shadow-2xl shadow-emerald-900/60", hover: "hover:shadow-emerald-500/50", iconBg: "bg-emerald-900/50", badge: "bg-emerald-600/50 text-emerald-100" },
        sky: { stat: "text-sky-400", title: "text-sky-300", border: "border-sky-500", shadow: "shadow-2xl shadow-sky-900/60", hover: "hover:shadow-sky-500/50", iconBg: "bg-sky-900/50", badge: "bg-sky-600/50 text-sky-100" },
        amber: { stat: "text-amber-400", title: "text-amber-300", border: "border-amber-500", shadow: "shadow-2xl shadow-amber-900/60", hover: "hover:shadow-amber-500/50", iconBg: "bg-amber-900/50", badge: "bg-amber-600/50 text-amber-100" },
        rose: { stat: "text-rose-400", title: "text-rose-300", border: "border-rose-500", shadow: "shadow-2xl shadow-rose-900/60", hover: "hover:shadow-rose-500/50", iconBg: "bg-rose-900/50", badge: "bg-rose-600/50 text-rose-100" },
    };
    return colorMap[color] || colorMap.indigo; 
};

const SuccessCard = ({ item }) => {
    const classes = getDynamicClasses(item.color);
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 60, scale: 0.9 },
                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.2, ease: "easeOut" } }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
        >
            <div 
                key={item.id} 
                className={`bg-gray-800 p-6 rounded-xl border-t-4 ${classes.border} ${classes.shadow} transform transition duration-500 hover:scale-110 ${classes.hover} flex flex-col h-full`}
            >
                <div className="flex justify-between items-start mb-4">
                    <div className={`text-4xl p-3 inline-block rounded-xl ${classes.iconBg}`}>{item.icon}</div>
                    <div className="text-right">
                        <p className={`text-4xl font-extrabold ${classes.stat} leading-none`}>{item.stat}</p>
                        <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mt-1 ${classes.badge}`}>{item.badge}</span>
                    </div>
                </div>
                <div className="flex-grow">
                    <h3 className={`text-xl font-bold mb-3 ${classes.title}`}>{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-sm">{item.description}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-700">
                    <a href="#" className={`text-sm font-semibold ${classes.stat} hover:text-white transition duration-200`}>Learn More →</a>
                </div>
            </div>
        </motion.div>
    );
};

const Success = () => {
    const focusStats = [
        { label: "Students Enrolled", value: successData[0].stat, color: "text-indigo-400" },
        { label: "Satisfaction Rate", value: successData[1].stat, color: "text-green-400" },
        { label: "Expert Instructors", value: successData[3].stat, color: "text-pink-400" },
    ];

    return (
        <div className="bg-gray-900 min-h-screen py-20">
            <div className="container mx-auto px-4">
                <header className="text-center mb-16 max-w-4xl mx-auto">
                    <p className="text-xl font-medium text-purple-400 uppercase tracking-widest mb-2">Why Choose Us?</p>
                    <h1 className="text-6xl font-extrabold text-white mb-4 leading-snug">
                        Proven <span className="text-indigo-500">Success</span>, Exceptional <span className="text-yellow-500">Value</span>
                    </h1>
                    <p className="text-xl text-gray-400">
                        We are proud of the milestones that solidify our position as a globally trusted platform for career growth and skill development.
                    </p>
                </header>

                <motion.div
                    className="max-w-5xl mx-auto mb-20 bg-gray-800 p-10 rounded-2xl shadow-2xl shadow-indigo-900/60 border-t-4 border-indigo-600"
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }}
                    viewport={{ once: false, amount: 0.3 }}
                >
                    <div className="flex flex-col md:flex-row justify-around items-center space-y-8 md:space-y-0">
                        {focusStats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0, transition: { duration: 1, delay: index * 0.2 } }}
                                viewport={{ once: false, amount: 0.3 }}
                                className="text-center"
                            >
                                <p className={`text-6xl font-extrabold ${stat.color} drop-shadow-xl`}>{stat.value}</p>
                                <p className="text-lg text-gray-300 font-semibold mt-2">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={{ show: { transition: { staggerChildren: 0.2 } } }}
                >
                    {successData.map((item) => <SuccessCard key={item.id} item={item} />)}
                </motion.div>

                <motion.div
                    className="mt-20 pt-16 border-t border-gray-700"
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }}
                    viewport={{ once: false, amount: 0.3 }}
                >
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-extrabold text-white mb-3">
                            Behind the <span className="text-yellow-500">Milestones</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            Our commitment goes beyond courses; it's about building successful careers and a thriving global learning ecosystem.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <motion.div className="p-6 bg-gray-800 rounded-xl border border-purple-500/30 shadow-xl shadow-purple-900/40" whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }} viewport={{ once: false, amount: 0.3 }}>
                            <h3 className="text-5xl font-extrabold text-purple-400 mb-2">98%</h3>
                            <p className="text-lg text-gray-300 font-semibold">Job Placement Rate</p>
                            <p className="text-sm text-gray-500 mt-1">Within 6 months of course completion.</p>
                        </motion.div>

                        <motion.div className="p-6 bg-gray-800 rounded-xl border border-cyan-500/30 shadow-xl shadow-cyan-900/40" whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }} viewport={{ once: false, amount: 0.3 }}>
                            <h3 className="text-5xl font-extrabold text-cyan-400 mb-2">50+</h3>
                            <p className="text-lg text-gray-300 font-semibold">Partner Companies</p>
                            <p className="text-sm text-gray-500 mt-1">Direct hiring ties with industry leaders.</p>
                        </motion.div>

                        <motion.div className="p-6 bg-gray-800 rounded-xl border border-rose-500/30 shadow-xl shadow-rose-900/40" whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }} viewport={{ once: false, amount: 0.3 }}>
                            <h3 className="text-5xl font-extrabold text-rose-400 mb-2">18</h3>
                            <p className="text-lg text-gray-300 font-semibold">Countries Served</p>
                            <p className="text-sm text-gray-500 mt-1">Impact across continents and cultures.</p>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div className="text-center pt-16 mt-16 border-t border-gray-700" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 1.2 } }} viewport={{ once: false, amount: 0.3 }}>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-10 rounded-full shadow-lg transition duration-300 transform hover:scale-105">
                        Start Your Success Story Today!
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default Success;
