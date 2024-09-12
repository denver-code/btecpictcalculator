'use client'

import React, { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Label } from "@/src/components/ui/label"
import { ScrollArea } from "@/src/components/ui/scroll-area"

import qualificationsData from '../data/qualifications.json'
import assessmentsData from '../data/assessments.json'
import unitsData from '../data/units.json'
import NoticeBox from './NoticeBox'
import { Button } from '../components/ui/button'
import { useToast } from '../hooks/use-toast'

// Define types
interface Qualification {
  name: string
  size: number
  mandatory_units: number
  optional_units: number
  summary: Record<string, number>
}

interface Assessment {
  unitNumber: number
  nameTitle: string
  isExternalAssesment: boolean
  unitSize: number
  priority: Record<string, string>
}

interface GradingUnits {
  [key: string]: {
    [grade: string]: number
  }
}

type Grades = Record<string, string>

type UnitsData = {
  internal: GradingUnits
  external: GradingUnits
}

export default function Page() {
  const [selectedQualification, setSelectedQualification] = useState<string>('')
  const [selectedGrades, setSelectedGrades] = useState<Grades>({})
  const [globalScore, setGlobalScore] = useState<number>(0)
  const [overallGrade, setOverallGrade] = useState<string>('')
  const [isNoticeBoxOpen, setIsNoticeBoxOpen] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const token = queryParams.get('token')
    if (token) {
      try {
        const parsedToken = JSON.parse(atob(token))
        setSelectedQualification(parsedToken.qualification)
        setSelectedGrades(parsedToken.grades)
      } catch (error) {
        console.error('Failed to parse token:', error)
      }
    }
  }, [])

  useEffect(() => {
    if (selectedQualification) {
      const token = btoa(JSON.stringify({ qualification: selectedQualification, grades: selectedGrades }))
      window.history.replaceState(null, '', `?token=${token}`)
    }
  }, [selectedQualification, selectedGrades])

  useEffect(() => {
    if (!selectedQualification) return

    let score = 0
    Object.entries(selectedGrades).forEach(([unitNumber, grade]) => {
      const unit = assessmentsData.find((unit) => unit.unitNumber === parseInt(unitNumber))
      if (unit && grade) {
        const unitSize = unit.unitSize.toString()
        const isExternal = unit.isExternalAssesment
        const gradingUnitsType = isExternal ? (unitsData as UnitsData).external : (unitsData as UnitsData).internal
        const gradingUnits = gradingUnitsType[unitSize]
        
        if (gradingUnits && grade in gradingUnits) {
          let points = gradingUnits[grade]
          if (isExternal && grade === 'NP' && 'NP' in gradingUnits) {
            points = gradingUnits['NP']
          }
          score += points
        }
      }
    })
    setGlobalScore(score)
  }, [selectedGrades, selectedQualification])

  useEffect(() => {
    if (!selectedQualification) return
    const qualification = qualificationsData[selectedQualification as keyof typeof qualificationsData] as Qualification
    if (!qualification) return

    const summary = qualification.summary
    let grade = ''
    Object.entries(summary).forEach(([key, value]) => {
      if (globalScore >= value) {
        grade = key
      }
    })
    setOverallGrade(grade)
  }, [selectedQualification, globalScore])

  const handleQualificationChange = (value: string) => {
    setSelectedQualification(value)
    setSelectedGrades({})
    setOverallGrade('')
  }

  const handleGradeChange = (unitNumber: string, grade: string) => {
    setSelectedGrades(prevGrades => ({ ...prevGrades, [unitNumber]: grade }))
  }

  return (
    <div className="flex flex-col items-center   bg-background text-foreground">
      <NoticeBox isOpen={isNoticeBoxOpen} onClose={() => setIsNoticeBoxOpen(false)} />
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-semibold mb-2 text-center">BTEC Pearson L3 ICT Calculator</h1>
        <p className="text-lg text-center">
          An easy way to quickly calculate your BTEC Pearson L3 ICT grades.
        </p>
        {/*  */}
        <p className="text-md text-muted-foreground mb-4   text-center">
          Let us know if you like new design!
        </p>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Select Target Qualification</CardTitle>
          </CardHeader>
          <CardContent>
            <Select onValueChange={handleQualificationChange} value={selectedQualification}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a qualification" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(qualificationsData).map(([key, qualification]) => (
                  <SelectItem key={key} value={key}>
                    {(qualification as Qualification).name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {selectedQualification && (
          <Card className="mb-40">
            <CardHeader>
              <CardTitle>Unit Grades for {(qualificationsData[selectedQualification as keyof typeof qualificationsData] as Qualification).name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-4">
                <p>GLH: {(qualificationsData[selectedQualification as keyof typeof qualificationsData] as Qualification).size}</p>
                <p>Mandatory Units: {(qualificationsData[selectedQualification as keyof typeof qualificationsData] as Qualification).mandatory_units}</p>
                <p>Optional Units: {(qualificationsData[selectedQualification as keyof typeof qualificationsData] as Qualification).optional_units}</p>
              </div>
              {/* <ScrollArea className="h-[40vh]"> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-max">
                  {(assessmentsData as Assessment[]).map((unit) => {
                    if (selectedQualification in unit.priority && unit.priority[selectedQualification] !== "") {
                      const priority = unit.priority[selectedQualification]
                      return (
                        <div key={unit.unitNumber} className="flex flex-col space-y-2 px-4">
                          <Label htmlFor={`unit-${unit.unitNumber}`}>{unit.unitNumber} | {unit.nameTitle}</Label>
                          <div className="flex flex-wrap gap-1 mb-2">
                            <Badge variant={priority === "M" ? "destructive" : "secondary"}>
                              {priority === "M" ? "Mandatory" : "Optional"}
                            </Badge>
                            {unit.isExternalAssesment && <Badge>External</Badge>}
                          </div>
                          <Select
                            onValueChange={(value) => handleGradeChange(unit.unitNumber.toString(), value)}
                            value={selectedGrades[unit.unitNumber.toString()] || ''}
                          >
                            <SelectTrigger id={`unit-${unit.unitNumber}`}>
                              <SelectValue placeholder="Select Grade" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="U">Unclassified</SelectItem>
                              {unit.isExternalAssesment && <SelectItem value="NP">Near Pass</SelectItem>}
                              <SelectItem value="P">Pass</SelectItem>
                              <SelectItem value="M">Merit</SelectItem>
                              <SelectItem value="D">Distinction</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )
                    }
                    return null
                  })}
                </div>
              {/* </ScrollArea> */}
            </CardContent>
          </Card>
        )}
        <Card className="fixed bottom-0 left-0 right-0 bg-card">
          <CardContent className="py-4 px-4 text-center">
            <p className="text-xl font-semibold">Overall Score: {globalScore}</p>
            <p className="text-xl font-semibold mt-2">Overall Grade: {overallGrade}</p>
            {/* if token is not empty - show copy button */}
            {selectedQualification && (
              <Button
                className="mt-4 bg-primary text-white font-semibold py-2 px-4 rounded-lg"
                onClick={() => {
                  const token = btoa(JSON.stringify({ qualification: selectedQualification, grades: selectedGrades }))
                  navigator.clipboard.writeText(`${window.location.origin}/?token=${token}`)
                  toast({
                   title: 'Link copied to clipboard', 
                   description: 'Awesome results! You have copied the link to the clipboard.'
                  })
                }}
              >
                Copy Link
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}