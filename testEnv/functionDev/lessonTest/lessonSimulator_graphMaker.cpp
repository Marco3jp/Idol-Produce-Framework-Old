#include <bits/stdc++.h>
#define ll long long
#define all(a) (a).begin(),(a).end()
#define BASE_SUCCESS_RATE 80
#define NORMAL_LESSON_BORDER 10
#define GOOD_LESSON_BORDER 12
#define PERFECT_LESSON_BORDER 14
//#define PRODUCER_LESSON_LEVEL 0
#define PENALTY_COUNT 55
#define DEFAULT_COUNT 20
#define NUMBER_OF_TEST 10000

using namespace std;

struct lessonData{
    int badLesson;
    int normalLesson;
    int goodLesson;
    int perfectLesson;
    struct{
        int numberOfTrials;
        int successCounter;
        int successiveSuccess;
        int notSuccess;
        int successivenotSuccess;
        struct{
            int numberOfTrials;
            int successCounter;
            int successiveSuccess;
            int notSuccess;
            int successivenotSuccess;
        }Sum;
    }Value;
};


void initGrade(lessonData &a);
void checkBorder(lessonData &a,int counter);
void nextTest(lessonData &a);

int main(int argc, char const *argv[]) {

    for (int PRODUCER_LESSON_LEVEL = 0; PRODUCER_LESSON_LEVEL < 30; PRODUCER_LESSON_LEVEL++) {
        mt19937 mt((int)time(NULL));
        uniform_int_distribution<> rand100(0, 99);

        lessonData normal,hard;
        int normalTimer,hardTimer,random;
        bool normalEnd,hardEnd;
        int temp;
        int successRate=BASE_SUCCESS_RATE+PRODUCER_LESSON_LEVEL;
        std::vector<int> normalTest(20,0);
        std::vector<int> hardTest(20,0);

        initGrade(normal);
        initGrade(hard);

        if(PRODUCER_LESSON_LEVEL>=5){
            successRate+=5;
        }
        if(PRODUCER_LESSON_LEVEL>=10){
            successRate+=2;
        }
        if(PRODUCER_LESSON_LEVEL>=20){
            successRate+=3;
        }

        for (size_t i = 0; i < NUMBER_OF_TEST; i++) {
            normalTimer=550,hardTimer=600;
            normalEnd=false,hardEnd=false;
            nextTest(normal);
            nextTest(hard);

            while (!normalEnd || !hardEnd) {
                random=rand100(mt);
                //ここから通常レッスン時の試行
                ++normal.Value.numberOfTrials;
                temp=1+(normal.Value.successiveSuccess-1)*3;
                if(!normalEnd){
                    if(random<successRate-(temp*log(temp))){
                            ++normal.Value.successCounter;
                            ++normal.Value.successiveSuccess;
                            normalTimer-=(DEFAULT_COUNT+(normal.Value.successiveSuccess-1)*4);
                    }else{
                        ++normalTest[normal.Value.successiveSuccess];
                        if(normal.Value.successiveSuccess!=1){
                            normal.Value.Sum.successiveSuccess+=normal.Value.successiveSuccess;
                        }
                        ++normal.Value.Sum.notSuccess;
                        normal.Value.successiveSuccess=1;
                        normalTimer-=(DEFAULT_COUNT+PENALTY_COUNT);
                    }
                }


                //ここからHardレッスン時の試行
                ++hard.Value.numberOfTrials;
                temp=1+(hard.Value.successiveSuccess-1)*3;
                if(!hardEnd){
                    if(random<successRate-(temp*log(temp))){
                            ++hard.Value.successCounter;
                            ++hard.Value.successiveSuccess;
                            hardTimer-=(DEFAULT_COUNT+(hard.Value.successiveSuccess-1)*4);
                    }else{
                        ++hardTest[hard.Value.successiveSuccess];
                        if(hard.Value.successiveSuccess!=1){
                            hard.Value.Sum.successiveSuccess+=hard.Value.successiveSuccess;
                        }else{
                            ++hard.Value.successivenotSuccess;
                        }
                        ++hard.Value.Sum.notSuccess;
                        hard.Value.successiveSuccess=1;
                        hardTimer-=(DEFAULT_COUNT+PENALTY_COUNT);
                    }
                }

                if(normalTimer<0 && !normalEnd){
                    normalEnd=true;
                    normal.Value.Sum.numberOfTrials+=normal.Value.numberOfTrials;
                }
                if(hardTimer<0 && !hardEnd){
                    hardEnd=true;
                    hard.Value.Sum.numberOfTrials+=hard.Value.numberOfTrials;
                }
            }
            //printf("%d回目 Normal=%d Hard=%d\n",i,normal.Value.successCounter,hard.Value.successCounter);
            normal.Value.Sum.successCounter+=normal.Value.successCounter;
            hard.Value.Sum.successCounter+=hard.Value.successCounter;
            normal.Value.Sum.successivenotSuccess+=normal.Value.successivenotSuccess;
            hard.Value.Sum.successivenotSuccess+=hard.Value.successivenotSuccess;
            checkBorder(normal,normal.Value.successCounter);
            checkBorder(hard,hard.Value.successCounter);
        }
        printf("%d,",PRODUCER_LESSON_LEVEL);
        printf("%d,%d,%d,%d,",normal.badLesson,normal.normalLesson,normal.goodLesson,normal.perfectLesson);
        printf("%d,%d,%d,%d\n",hard.badLesson,hard.normalLesson,hard.goodLesson,hard.perfectLesson);
    }
    return 0;
}

void initGrade(lessonData &a){
    a.badLesson=0;
    a.normalLesson=0;
    a.goodLesson=0;
    a.perfectLesson=0;
    a.Value.numberOfTrials=0;
    a.Value.successCounter=0;
    a.Value.successiveSuccess=0;
    a.Value.notSuccess=0;
    a.Value.successivenotSuccess=0;
    a.Value.Sum.numberOfTrials=0;
    a.Value.Sum.successCounter=0;
    a.Value.Sum.successiveSuccess=0;
    a.Value.Sum.notSuccess=0;
    a.Value.Sum.successivenotSuccess=0;
}

void nextTest(lessonData &a){
    a.Value.numberOfTrials=0;
    a.Value.successCounter=0;
    a.Value.successiveSuccess=1;
    a.Value.notSuccess=0;
    a.Value.successivenotSuccess=0;
}

void checkBorder(lessonData &a,int counter){
    if(counter<NORMAL_LESSON_BORDER){
        ++a.badLesson;
    }else if(counter<GOOD_LESSON_BORDER){
        ++a.normalLesson;
    }else if(counter<PERFECT_LESSON_BORDER){
        ++a.goodLesson;
    }else{
        ++a.perfectLesson;
    }
}

/*
値一覧
初期成功率
減衰率(連続成功時)
減衰抑制(Pレッスンレベル依存)

Pレッスンレベル
Pレッスン経験値

※N=1+(連続成功数-1)x4 | P=Pレッスンレベル | B=基礎成功率 | G=成功率
(B+P)-(Nlog(N))=G

このシミュレータではハード・ノーマルレッスンをそれぞれ100回試行した結果を出力します。

*/
