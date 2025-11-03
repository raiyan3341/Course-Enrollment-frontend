import React from "react";

const reviewsData = 
  [
    {
      "id": 1,
      "name": "John Doe",
      "course": "Full Stack Web Development",
      "rating": 5,
      "comment": "This course transformed my career! Highly recommended."
    },
    {
      "id": 2,
      "name": "Sarah Khan",
      "course": "Cybersecurity Fundamentals",
      "rating": 4,
      "comment": "Very informative course. Instructor explains clearly."
    },
    {
      "id": 3,
      "name": "Michael Lee",
      "course": "Data Science with Python",
      "rating": 5,
      "comment": "Excellent content and practical projects."
    },
    {
      "id": 4,
      "name": "Emily Johnson",
      "course": "React.js Advanced Concepts",
      "rating": 5,
      "comment": "Loved the hooks and context API explanations!"
    },
    {
      "id": 5,
      "name": "David Smith",
      "course": "Python Programming for Beginners",
      "rating": 4,
      "comment": "Great start for beginners, well structured."
    },
    {
      "id": 6,
      "name": "Olivia Brown",
      "course": "UI/UX Design Essentials",
      "rating": 5,
      "comment": "Design principles explained beautifully. Very practical."
    },
    {
      "id": 7,
      "name": "Robert Green",
      "course": "Digital Marketing Mastery",
      "rating": 4,
      "comment": "Good insights on SEO and social media marketing."
    },
    {
      "id": 8,
      "name": "Sophia Patel",
      "course": "Machine Learning with TensorFlow",
      "rating": 5,
      "comment": "Deep learning concepts made simple and clear."
    },
    {
      "id": 9,
      "name": "James Anderson",
      "course": "C++ Object-Oriented Programming",
      "rating": 4,
      "comment": "Learned OOP concepts effectively with examples."
    },
    {
      "id": 10,
      "name": "Ava Carter",
      "course": "Database Management with MySQL",
      "rating": 5,
      "comment": "SQL and database design explained in an easy way."
    },
    {
      "id": 11,
      "name": "Daniel Scott",
      "course": "Node.js & Express.js Backend",
      "rating": 5,
      "comment": "Building APIs and backend flow is very clear."
    },
    {
      "id": 12,
      "name": "Nora Blake",
      "course": "Ethical Hacking & Penetration Testing",
      "rating": 5,
      "comment": "Amazing practical hacking exercises."
    },
    {
      "id": 13,
      "name": "Henry Wilson",
      "course": "Cloud Computing with AWS",
      "rating": 4,
      "comment": "Great introduction to cloud services and deployment."
    },
    {
      "id": 14,
      "name": "Emma Davis",
      "course": "Artificial Intelligence for Everyone",
      "rating": 4,
      "comment": "Good overview of AI for beginners."
    },
    {
      "id": 15,
      "name": "Lucas Martin",
      "course": "Java Programming Bootcamp",
      "rating": 5,
      "comment": "Java fundamentals explained clearly, excellent examples."
    },
    {
      "id": 16,
      "name": "Sophia Williams",
      "course": "Mobile App Development with Flutter",
      "rating": 5,
      "comment": "Learned Flutter widgets and layouts effectively."
    },
    {
      "id": 17,
      "name": "Oliver Brown",
      "course": "DevOps Fundamentals",
      "rating": 4,
      "comment": "CI/CD pipelines and Docker explained well."
    },
    {
      "id": 18,
      "name": "Grace Miller",
      "course": "Blockchain Essentials",
      "rating": 5,
      "comment": "Blockchain basics made simple. Highly recommended."
    },
    {
      "id": 19,
      "name": "Chloe Taylor",
      "course": "English Communication Skills",
      "rating": 4,
      "comment": "Improved my speaking and writing with this course."
    },
    {
      "id": 20,
      "name": "William Garcia",
      "course": "Project Management Professional (PMP)",
      "rating": 5,
      "comment": "Very detailed, prepares you well for PMP certification."
    },
    {
      "id": 21,
      "name": "Isabella Martinez",
      "course": "React.js Advanced Concepts",
      "rating": 5,
      "comment": "Loved the state management and useEffect explanations."
    },
    {
      "id": 22,
      "name": "Liam Johnson",
      "course": "Full Stack Web Development",
      "rating": 5,
      "comment": "Project-based learning really helped me understand MERN stack."
    },
    {
      "id": 23,
      "name": "Sophia Lee",
      "course": "Data Science with Python",
      "rating": 5,
      "comment": "Hands-on projects made learning fun and effective."
    },
    {
      "id": 24,
      "name": "Ethan Brown",
      "course": "Cybersecurity Fundamentals",
      "rating": 4,
      "comment": "Instructor was very knowledgeable and clear."
    },
    {
      "id": 25,
      "name": "Mia Clark",
      "course": "Python Programming for Beginners",
      "rating": 5,
      "comment": "Great content for beginners, easy to follow."
    },
    {
      "id": 26,
      "name": "Noah Wilson",
      "course": "UI/UX Design Essentials",
      "rating": 5,
      "comment": "Design concepts explained with real-world examples."
    },
    {
      "id": 27,
      "name": "Avery Scott",
      "course": "Digital Marketing Mastery",
      "rating": 4,
      "comment": "Practical marketing tips, very useful."
    },
  ];


const RatingStars = ({ rating }) => {

    const stars = Array(5).fill(0).map((_, index) => (
        <span
            key={index}
            className={`text-2xl ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        >
            ★
        </span>
    ));
    return <div className="flex items-center space-x-0.5">{stars}</div>;
};



const calculateStatistics = (data) => {
    const totalRatings = data.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = (totalRatings / data.length) || 0;
    
    
    const displayRating = Math.round(averageRating * 10) / 10; 
    
    return {
        totalReviews: data.length,
        averageRating: displayRating,
        fiveStarCount: data.filter(r => r.rating === 5).length,
    };
};

const Reviews = () => {
    const stats = calculateStatistics(reviewsData);

    return (
        <div className="container mx-auto px-4 py-16 min-h-screen bg-gray-900 text-white">
            
           
            <header className="text-center mb-16">
                <p className="text-lg font-medium text-indigo-400 uppercase tracking-widest">
                    Trust & Transparency
                </p>
                <h1 className="text-6xl font-extrabold mt-2 mb-4 leading-tight">
                    Hear What Our <span className="text-yellow-400">Students Say</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                    Real feedback from real learners who transformed their careers with our cutting-edge courses.
                </p>
            </header>

           
            <div className="max-w-4xl mx-auto mb-16 bg-gray-800 p-8 rounded-2xl shadow-xl border border-indigo-700/50">
                <div className="flex flex-col md:flex-row justify-around items-center space-y-6 md:space-y-0">
                    
                   
                    <div className="text-center">
                        <p className="text-5xl font-extrabold text-yellow-400 drop-shadow-lg">
                            {stats.averageRating}
                        </p>
                        <RatingStars rating={Math.round(stats.averageRating)} />
                        <p className="text-gray-400 mt-1 text-sm">Overall Course Rating</p>
                    </div>

                   
                    <div className="text-center">
                        <p className="text-5xl font-extrabold text-indigo-400 drop-shadow-lg">
                            {stats.totalReviews}+
                        </p>
                        <p className="text-lg text-gray-300 font-semibold mt-1">Total Verified Reviews</p>
                        <p className="text-gray-500 text-sm">From successful graduates</p>
                    </div>

              
                    <div className="text-center">
                        <p className="text-5xl font-extrabold text-green-400 drop-shadow-lg">
                            {Math.round((stats.fiveStarCount / stats.totalReviews) * 100) || 0}%
                        </p>
                        <p className="text-lg text-gray-300 font-semibold mt-1">Five Star Reviews</p>
                        <p className="text-gray-500 text-sm">High satisfaction rate</p>
                    </div>
                </div>
            </div>

        
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mt-10 mb-20">
                {reviewsData.map((review) => (
                   
                    <div 
                        key={review.id} 
                        className="bg-gray-700 border-2 border-indigo-600/30 p-6 rounded-2xl shadow-2xl shadow-indigo-900/40 transform transition duration-500 hover:scale-110 hover:shadow-indigo-500/50"
                    >
                    
                        <div className="text-indigo-400 text-4xl mb-3 leading-none opacity-80">❝</div> 
                        
                        
                        <p className="text-gray-300 italic mb-4 text-lg">"{review.comment}"</p>
                        
                      
                        <hr className="border-gray-700 mb-4" /> 

                  
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-xl text-white font-semibold">{review.name}</p>
                                <p className="text-sm text-indigo-400 mt-0.5 font-medium">{review.course}</p>
                            </div>
                            
                          
                            <RatingStars rating={review.rating} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center pt-8 border-t border-gray-700">
                <p className="text-gray-400 text-lg mb-4">
                    Ready to join thousands of satisfied learners?
                </p>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105">
                    Explore Our Courses Today!
                </button>
            </div>
            
        </div>
    );
};

export default Reviews;